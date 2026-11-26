
// Decides what to do with each incoming message:
// learn ids -> Kennedy protection (fast) -> AFK -> commands -> AI chat (if Rimuru is addressed)
const config = require('./config');
const log = require('./lib/logger');
const fs = require('fs');
const path = require('path');
const { numberOf } = require('./lib/jid');
const { fmtDuration } = require('./lib/time');
const { isDuplicate } = require('./lib/dedupe');
const { unwrap, getText, getContext } = require('./lib/helpers');
const commands = require('./index');
const nick = require('./lib/nick');
const settings = require('./lib/settings');
const memory = require('./lib/memory');
const fallback = require('./lib/fallback');
const { systemPrompt, offlineReply, nameCallReply, cleanReply, isBoilerplate, isDistress, provocation, isHumanQuestion, identityReply, isVendorClaim } = require('./lib/personality');
const clapbacks = require('./lib/clapbacks');
const chatlog = require('./lib/chatlog');
const extras = require('./lib/extras');

// How much Rimuru tolerates this person (see affinity.js). Added to his instructions.
function bondNote(num, isOwner) {
  if (isOwner) return '';
  const { level } = extras.getAffinity(num);
  if (level === 'stranger' || level === 'tolerated') return `\n- Your bond with this person: ${level}. Do not warm up to them.`;
  return `\n- Your bond with this person: ${level}. You are a little less sharp with them than with strangers, but still you.`;
}

const lastAiAt = new Map();
const afkNoticeAt = new Map();

// Sticker mood folders.
const STICKER_DIR = path.join(__dirname, 'rimuru stickers');

const MOOD_PATTERNS = {
  laugh: /😂|🤣|😹|\b(lol|lmao|rofl|hilarious|funny|laughing)\b/i,
  angry: /😡|🤬|😠|💢|\b(angry|furious|annoyed|irritated|mad|upset|hate)\b/i,
  sad: /😢|😭|🥺|😔|💔|\b(sad|sorry|unfortunately|heartbroken|crying|miss you|disappointed)\b/i,
  surprised: /😲|😮|😯|😱|🤯|‼️|\b(wow|what|really|seriously|surprised|unexpected|shocking)\b/i,
  happy: /😀|😃|😄|😁|😊|🥳|😍|❤️|💕|\b(happy|glad|great|awesome|wonderful|congratulations|love that)\b/i,
};

function detectMood(text) {
  for (const [mood, pattern] of Object.entries(MOOD_PATTERNS)) {
    if (pattern.test(text)) return mood;
  }
  return 'neutral';
}

async function sendMoodSticker(ctx, text) {
  try {
    const mood = detectMood(text);
    const moodDir = path.join(STICKER_DIR, mood);

    if (!fs.existsSync(moodDir)) return;

    const files = fs.readdirSync(moodDir).filter((file) =>
      file.toLowerCase().endsWith('.webp')
    );

    if (!files.length) return;

    const selected = files[Math.floor(Math.random() * files.length)];
    const sticker = fs.readFileSync(path.join(moodDir, selected));

    await ctx.sock.sendMessage(
  ctx.jid,
  { sticker }
);
  } catch (e) {
    log.warn('Mood sticker failed:', e.message);
  }
}

// Sends an AI reply followed by its matching sticker.
async function replyWithSticker(ctx, text) {
  await ctx.reply(text);
  await sendMoodSticker(ctx, text);
}


// Owner phrases that put Rimuru to sleep / wake him up in the current chat.
const SLEEP_RE = /^\s*(?:(?:hey\s+)?rimuru[\s,]+(?:go\s+(?:to\s+)?)?sleep(?:\s+now)?|sleep\s+(?:now\s+)?rimuru|go\s+(?:to\s+)?sleep\s+rimuru)\s*[.!]*\s*$/i;
const WAKE_RE = /^\s*(?:(?:hey\s+)?rimuru[\s,]+wake(?:\s+up)?|wake\s+up\s+rimuru|wake\s+rimuru(?:\s+up)?)\s*[.!]*\s*$/i;

// Ids of messages Rimuru himself sent. A reply to one of these is a reply to Rimuru,
// whatever id (phone number or hidden LID) WhatsApp shows for him.
const sentIds = new Map();
const extraBotIds = new Set();
const wrapped = new WeakSet();

function trackSent(sock) {
  if (wrapped.has(sock)) return;
  wrapped.add(sock);
  const original = sock.sendMessage.bind(sock);
  sock.sendMessage = async (...args) => {
    const res = await original(...args);
    const id = res && res.key && res.key.id;
    if (id) {
      sentIds.set(id, Date.now());
      if (sentIds.size > 1000) for (const k of sentIds.keys()) {
        sentIds.delete(k);
        if (sentIds.size <= 800) break;
      }
    }
    return res;
  };
}

const botNumbers = (sock) =>
  [sock.user?.id, sock.user?.lid]
    .filter(Boolean)
    .map(numberOf)
    .concat([...extraBotIds]);

// WhatsApp can show the same person as a phone number AND as a hidden id (LID).
// When we see both for a known owner/protected person, remember both.
function learnAliases(msg) {
  const k = msg.key;
  const ids = [
    k.participant,
    k.participantAlt,
    k.participantPn,
    k.remoteJidAlt,
    k.remoteJid,
  ]
    .filter((j) => j && (j.endsWith('@s.whatsapp.net') || j.endsWith('@lid')))
    .map(numberOf);

  const uniq = [...new Set(ids)];
  if (uniq.length < 2) return;

  if (uniq.some((n) => settings.isMainOwner(n))) settings.addClaimed(uniq);
  else if (uniq.some((n) => settings.isSubOwner(n))) settings.addSubOwners(uniq);
  else if (uniq.some((n) => settings.protectedIds().includes(n))) settings.addProtectAlias(uniq);
}

// In groups Rimuru only answers when addressed: his name, an @mention, or a reply to him.
function isAddressed(ctx, bots) {
  if (!ctx.isGroup) return true;
  if (/\brimuru\b/i.test(ctx.text)) return true;

  const quotedId = ctx.ctxInfo?.stanzaId;
  if (quotedId && sentIds.has(quotedId)) {
    if (ctx.ctxInfo.participant) extraBotIds.add(numberOf(ctx.ctxInfo.participant));
    return true;
  }

  if (ctx.mentioned.some((j) => bots.includes(numberOf(j)))) return true;
  if (ctx.ctxInfo?.participant && bots.includes(numberOf(ctx.ctxInfo.participant))) return true;

  return false;
}

async function afkHandling(ctx, isAfkCommand) {
  // 1) The AFK person is back
  const mine = settings.getAfk(ctx.senderNum);
  if (mine && !isAfkCommand) {
    settings.clearAfk(ctx.senderNum);
    await ctx.reply(`Back already? You were gone ${fmtDuration(Date.now() - mine.since)}.`);
  }

  // 2) Someone tagged / replied to an AFK person (groups only, max once per 5 min per person)
  if (!ctx.isGroup) return;

  const targets = [
    ...new Set([...ctx.mentioned, ctx.ctxInfo?.participant].filter(Boolean).map(numberOf)),
  ];

  for (const n of targets) {
    const afk = settings.getAfk(n);
    if (!afk || n === ctx.senderNum) continue;

    const key = `${ctx.jid}:${n}`;
    if (Date.now() - (afkNoticeAt.get(key) || 0) < 5 * 60 * 1000) continue;

    afkNoticeAt.set(key, Date.now());
    await ctx.reply(`${afk.name || 'They'} is AFK: ${afk.reason} (${fmtDuration(Date.now() - afk.since)} ago).`);
  }
}

async function handleMessage(sock, msg) {
  trackSent(sock);

  const receivedAt = Date.now();
  if (!msg.message || msg.key.fromMe) return;

  const jid = msg.key.remoteJid;
  if (!jid || jid.endsWith('@broadcast') || jid.endsWith('@newsletter')) return;
  if (isDuplicate(msg.key.id)) return;

  const ts = Number(msg.messageTimestamp) || 0;
  if (ts && Date.now() / 1000 - ts > 120) return;

  const m = unwrap(msg.message);
  if (!m || m.protocolMessage || m.reactionMessage || (m.senderKeyDistributionMessage && Object.keys(m).length === 1)) return;

  learnAliases(msg);

  const text = getText(m).trim();
  const isGroup = jid.endsWith('@g.us');
  const sender = msg.key.participant || jid;
  const senderNum = numberOf(sender);
  const ctxInfo = getContext(m);

  const ctx = {
    sock,
    msg,
    m,
    jid,
    sender,
    senderNum,
    text,
    isGroup,
    ctxInfo,
    receivedAt,
    pushName: msg.pushName || '',
    mentioned: ctxInfo?.mentionedJid || [],
    isOwner: settings.isOwner(senderNum),
    isMainOwner: settings.isMainOwner(senderNum),
    isBotMessage: (id, participant) =>
      sentIds.has(id) || Boolean(participant && botNumbers(sock).includes(numberOf(participant))),
    reply: (t, extra = {}) => sock.sendMessage(jid, { text: t, ...extra }, { quoted: msg }),
  };

  ctx.addressed = isAddressed(ctx, botNumbers(sock));

  const parsed = commands.parse(text, ctx);
  const isAfkCommand = Boolean(parsed && parsed.cmd.name === 'afk');

  // Keep the last group messages in memory (never saved) so .recap has something to read.
  if (isGroup && text && !parsed) chatlog.add(jid, { name: ctx.pushName || senderNum, text });

  // Sleep mode: asleep = total silence in this chat, except the owner waking him up.
  const wantsWake = ctx.isOwner && (WAKE_RE.test(text) || Boolean(parsed && parsed.cmd.name === 'wake'));

  if (settings.isAsleep(jid)) {
    if (wantsWake) {
      settings.setSleep(jid, false);
      await ctx.reply("Yeah, yeah. I'm up.");
    }
    return;
  }

  if (ctx.isOwner && SLEEP_RE.test(text)) {
    settings.setSleep(jid, true);
    await ctx.reply("Fine. I'm out. Wake me with 'rimuru wake up' when you need me.");
    return;
  }

  // FAST PATH: someone tagged Kennedy in a group (and it is not a command).
  const protectNow = async () => {
    const protect = nick.check(ctx);
    if (!protect) return false;

    await Promise.all([
      sock.sendMessage(jid, { react: { text: protect.emoji, key: msg.key } }).catch(() => {}),
      ctx.reply(protect.reply),
    ]);

    return true;
  };

  if (!parsed && (await protectNow())) return;

  // 0) AFK bookkeeping
  await afkHandling(ctx, isAfkCommand).catch((e) =>
    log.warn('AFK handling failed:', e.message)
  );

  // 1) Commands
  if (parsed && (await commands.run(ctx))) return;
  if (parsed && (await protectNow())) return;

  // 3) AI conversation
  if (!text || !settings.isAiOn(jid) || !isAddressed(ctx, botNumbers(sock))) return;

  // Just his name ("Rimuru") -> a quick answer with no AI call.
  if (/^@?\s*rimuru[\s!?.,]*$/i.test(text)) {
    await replyWithSticker(ctx, nameCallReply(ctx.isOwner));
    return;
  }

  // Owners are never rate-limited.
  if (!ctx.isOwner) {
    const last = lastAiAt.get(senderNum) || 0;
    if (Date.now() - last < config.ai.userCooldownMs) return;
    lastAiAt.set(senderNum, Date.now());
  }

  // "Who built you?" and "what model are you?" are answered directly.
  const who = identityReply(text, ctx.isOwner);
  if (who) {
    memory.add(senderNum, 'user', text);
    memory.add(senderNum, 'assistant', who);
    await replyWithSticker(ctx, who);
    return;
  }

  // Sincerely asked if he's human: honest, in his own voice.
  if (isHumanQuestion(text)) {
    await replyWithSticker(ctx, clapbacks.pick(ctx.isOwner ? 'notHumanOwner' : 'notHuman'));
    return;
  }

  // Provoked (insult, slur, pet name, "you're a bot"): he always hits back.
  const provoked = provocation(text);
  if (provoked && !ctx.isOwner) {
    await replyWithSticker(ctx, clapbacks.pick(provoked));
    return;
  }

  sock.sendPresenceUpdate('composing', jid).catch(() => {});

  // Drop any old answers that wrongly named a company as his maker.
  const history = memory.get(senderNum).filter(
    (h) => !(h.role === 'assistant' && isVendorClaim(h.content))
  );

  const messages = [
    {
      role: 'system',
      content: systemPrompt({
        isGroup,
        name: ctx.pushName,
        isOwner: ctx.isOwner,
        provocation: provoked,
      }) + bondNote(senderNum, ctx.isOwner),
    },
    ...history,
    { role: 'user', content: text },
  ];

  const result = await fallback.generate(messages);
  sock.sendPresenceUpdate('paused', jid).catch(() => {});

  if (!result) {
    log.warn('All AI providers failed for a message.');
    await replyWithSticker(ctx, offlineReply());
    return;
  }

  let answer = cleanReply(result.text);

  // Assistant-style safety boilerplate is replaced by a one-liner,
  // unless the person seems to be in real distress.
  if (isBoilerplate(answer) && !isDistress(text)) {
    answer = clapbacks.pick(ctx.isOwner ? 'deflectOwner' : 'deflect');
  }

  memory.add(senderNum, 'user', text);
  memory.add(senderNum, 'assistant', answer);
  extras.gainAffinity(senderNum);

  await replyWithSticker(ctx, answer);
}

module.exports = { handleMessage };
