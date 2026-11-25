// RIMURU v2 — VECTOR-MD command pack adapter.
// Bridges the VECTOR MD command format (execute(sock, msg, args, sender, ctx))
// into the Rimuru format (run(ctx)). Names that clash with Rimuru's own
// commands are dropped by index.js (his commands always win).
//
// Credits: original commands & APIs by CHAD FDEV / VECTOR-MD.
const fs = require('fs');
const path = require('path');
const config = require('../config');

// ── Shared state globals the pack commands expect (same defaults VECTOR MD boots with)
for (const k of ['whitelist', 'mutedUsers', 'autoReact', 'afkUsers', 'welcome', 'goodbye',
  'chatbot', 'warnCount', 'groupRules', 'stickerCmds', 'antiSpam', 'antiTag', 'antiBadWord',
  'antiLink', 'antiBot', 'antiBotSet', 'antiMention', 'antiDelete', 'autoSettings', 'vectorChats',
  '_trivia', '_hangman', '_ttt', '_wordle', '_simon', '_higherlower', '_typingtest', '_memorygame',
  '_blackjack', '_numbattle', '_scramble', '_guessGames', '_vote', '_poll', '_chatbotHistory']) {
  if (!global[k]) global[k] = global[k] || (k === 'badWords' || k === 'pairedUsers' ? [] : {});
}
if (!global.badWords) global.badWords = [];
if (!global.pairedUsers) global.pairedUsers = [];
if (!global.currentPrefix) global.currentPrefix = config.prefix || '.';
if (!global.stickerAuthor) global.stickerAuthor = 'CHAD FDEV';
if (!global.saveState) global.saveState = () => {};
global.addPaired = global.addPaired || (() => {});
global.savePaired = global.savePaired || (() => {});

const PACK_DIR = path.join(__dirname, 'vectorpack');

// NOTE: no economy category — removed from Rimuru v2.1 on purpose.
const CAT_LABELS = {
  ai: 'AI', downloader: 'DOWNLOAD', games: 'GAMES', fun: 'FUN',
  unicode: 'FONTS', textmaker: 'TEXTMAKER', utility: 'UTILITY', owner: 'OWNER',
  group: 'GROUP TOOLS', protection: 'PROTECTION', cyber: 'CYBER', reactions: 'REACTIONS',
  animals: 'ANIMALS', stickers: 'STICKER TOOLS', general: 'VECTOR PACK',
};

let files = [];
try { files = fs.readdirSync(PACK_DIR).filter((f) => f.endsWith('.js')); }
catch (e) { console.log('[vectorpack] folder missing:', e.message); }

const out = [];
let fails = 0;
for (const f of files) {
  const p = path.join(PACK_DIR, f);
  let mod;
  try {
    delete require.cache[require.resolve(p)];
    mod = require(p);
  } catch (e) {
    fails++;
    continue;
  }
  if (!mod || !mod.name || typeof mod.execute !== 'function') continue;
  const cat = String(mod.category || 'general').toLowerCase();
  out.push({
    name: String(mod.name).toLowerCase(),
    aliases: Array.isArray(mod.aliases) ? mod.aliases.map(String) : [],
    category: CAT_LABELS[cat] || 'VECTOR PACK',
    menu: [String(mod.name).toLowerCase()],
    pack: 'vector-md',
    run: async (ctx) => {
      await mod.execute(ctx.sock, ctx.msg, ctx.args || [], ctx.senderNum, {
        isOwner: Boolean(ctx.isOwner), isPaired: true, senderNum: ctx.senderNum,
      });
    },
  });
}

module.exports = out;
