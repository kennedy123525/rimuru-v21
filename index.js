// Command registry — RIMURU v2 (restructured by CHAD FDEV / VECTOR-MD).
// Every command module lives in COMMANDS/. Drop a file there that exports an
// array of { name, run(ctx), ... } and the bot picks it up. The menu builds
// itself from whatever is registered.
const fs = require('fs');
const path = require('path');
const config = require('./config');
const settings = require('./lib/settings');
const log = require('./lib/logger');
const { findMedia } = require('./lib/helpers');

const CMD_DIR = path.join(__dirname, 'COMMANDS');

// Rimuru's own modules load first; packs loaded after can never overwrite
// a name or alias that already exists (his commands always win).
const NATIVE_ORDER = [
  'general.js', 'ai.js', 'sticker.js', 'music.js', 'profile.js', 'group.js',
  'afk.js', 'owner.js', 'download.js', 'convert.js', 'hidetag.js', 'recap.js',
  'affinity.js', 'games.js', 'viewonce.js',
];

function loadModules() {
  let files = [];
  try { files = fs.readdirSync(CMD_DIR).filter((f) => f.endsWith('.js')); }
  catch (e) { log.error('COMMANDS/ folder missing:', e.message); return []; }
  const ordered = [
    ...NATIVE_ORDER.filter((f) => files.includes(f)),
    ...files.filter((f) => !NATIVE_ORDER.includes(f)).sort(),
  ];
  const mods = [];
  for (const f of ordered) {
    const p = path.join(CMD_DIR, f);
    try {
      delete require.cache[require.resolve(p)];
      const arr = require(p);
      if (Array.isArray(arr)) mods.push({ file: f, arr });
      else log.warn(`COMMANDS/${f} does not export an array — skipped`);
    } catch (e) {
      log.error(`COMMANDS/${f} failed to load: ${e.message}`);
    }
  }
  return mods;
}

const list = [];
const byName = new Map();
let nativeCount = 0, packCount = 0, packFiles = 0;
for (const { file, arr } of loadModules()) {
  const isPack = !NATIVE_ORDER.includes(file);
  if (isPack) packFiles++;
  for (const cmd of arr) {
    if (!cmd || !cmd.name || typeof cmd.run !== 'function') continue;
    if (byName.has(cmd.name)) continue;
    const aliases = (cmd.aliases || []).filter((a) => !byName.has(a));
    list.push(cmd);
    byName.set(cmd.name, cmd);
    aliases.forEach((a) => byName.set(a, cmd));
    if (isPack) packCount++; else nativeCount++;
  }
}
if (packCount) log.info(`Commands: ${nativeCount} native + ${packCount} from ${packFiles} pack file(s) = ${list.length} total`);

// If the owner changes the prefix to something odd (an emoji, say) and forgets it, these
// few commands ALSO answer to the default prefix, so nobody gets locked out.
const RECOVERY = new Set(['setprefix', 'claim', 'wake']);

// ---- Commands WITHOUT the prefix: owners (and sub-owners) only ---------------------
// To avoid firing during normal chat, each command only counts when the message has the right shape:
//  'exact' = the message is just the command word ("menu", "ping"); 'rest' = word + free text ("afk lunch")
//  functions = needs a real target / number / media (so "kick @user" works, plain talk doesn't).
// In groups, 'exact' and 'rest' commands also need his name ("Rimuru ping"), a tag, or a reply to him.
const hasNumber = (a) => a.some((x) => { const d = x.replace(/\D/g, ''); return d.length >= 7 && d.length <= 15; });
const hasTarget = (ctx) => ctx.mentioned.length > 0 || Boolean(ctx.ctxInfo && ctx.ctxInfo.participant);
const hasMedia = (ctx, kinds) => Boolean(findMedia(ctx.msg, kinds));
const onOff = (a) => /^(?:on|off)$/i.test(a[0] || '');
const NO_PREFIX = {
  menu: 'exact', help: 'exact', ping: 'exact', about: 'exact', status: 'exact', owner: 'exact', clear: 'exact',
  afk: 'rest', play: 'rest',
  chatbot: (a) => onOff(a), protect: (a) => onOff(a),
  setprefix: (a) => a.length === 1 && (a[0].toLowerCase() === 'reset' || /^[^a-z0-9\s]{1,2}$/i.test(a[0])),
  add: (a) => hasNumber(a),
  kick: (a, ctx) => hasTarget(ctx),
  getpp: (a, ctx) => hasTarget(ctx),
  addsubowner: (a, ctx) => hasTarget(ctx) || hasNumber(a),
  delsubowner: (a, ctx) => hasTarget(ctx) || hasNumber(a),
  d: (a, ctx) => /^\d+\s*(?:s|sec|m|min|h|hr)?$/i.test(a[0] || '') && Boolean(ctx.ctxInfo && ctx.ctxInfo.stanzaId),
  s: (a, ctx) => hasMedia(ctx, ['image', 'video']),
  take: (a, ctx) => hasMedia(ctx, ['sticker']),
  toimg: (a, ctx) => hasMedia(ctx, ['sticker']),
  setprofilepic: (a, ctx) => hasMedia(ctx, ['image']),
};

function parseNoPrefix(text, ctx) {
  if (!ctx || !ctx.isOwner) return null;
  const stripped = text.replace(/^\s*(?:hey\s+)?rimuru[\s,:;-]+/i, '');
  const startedWithName = stripped !== text;
  const [word, ...args] = stripped.trim().split(/\s+/);
  const cmd = byName.get((word || '').toLowerCase().replace(/[.,!?]+$/, ''));
  const rule = cmd && NO_PREFIX[cmd.name];
  if (!rule) return null;
  const addressed = !ctx.isGroup || startedWithName || Boolean(ctx.addressed);
  if (rule === 'exact') return args.length === 0 && addressed ? { cmd, args } : null;
  if (rule === 'rest') return (cmd.name !== 'play' || args.length > 0) && addressed ? { cmd, args } : null;
  return rule(args, ctx) ? { cmd, args } : null;
}

// Is this text a command? -> { cmd, args } or null
function parsePrefixed(text) {
  const custom = settings.prefix();
  let body;
  if (text.startsWith(custom)) body = text.slice(custom.length);
  else if (custom !== config.prefix && text.startsWith(config.prefix)) body = text.slice(config.prefix.length);
  else return null;
  const [name, ...args] = body.trim().split(/\s+/);
  const cmd = byName.get((name || '').toLowerCase());
  if (!cmd) return null;
  if (!text.startsWith(custom) && !RECOVERY.has(cmd.name)) return null;
  return { cmd, args };
}

function parse(text, ctx) {
  return parsePrefixed(text) || parseNoPrefix(text, ctx);
}

// Returns true if the message was a known command (and was handled).
async function run(ctx) {
  const parsed = parse(ctx.text, ctx);
  if (!parsed) return false;
  const { cmd, args } = parsed;
  ctx.args = args;
  ctx.argText = args.join(' ');
  ctx.commandList = list;
  try {
    if (cmd.mainOwnerOnly && !ctx.isMainOwner) { await ctx.reply('Only the main owner can do that.'); return true; }
    if (cmd.ownerOnly && !ctx.isOwner) { await ctx.reply('That one is for the owner only.'); return true; }
    await cmd.run(ctx);
  } catch (e) {
    log.error(`Command ${cmd.name} failed:`, e.message);
    await ctx.reply("That didn't work. Try again in a bit.").catch(() => {});
  }
  return true;
}

module.exports = { run, parse, list };
