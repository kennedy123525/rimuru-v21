'use strict'
// ── VECTOR MD Season Engine ─────────────────────────────────────────────────────
// .setbotseason <name> re-themes the whole bot: font style, menu banner,
// Vector + AI personality, command reactions. Persisted via global.saveState().
// Season data lives in global.botSeason ("none" = normal bot).

const SEASONS = {
  none: {
    name: "Normal", flag: "🤖", deco: "",
    greetEmoji: "👋",
    menuBanner: "ʏᴏᴜʀ ᴡʜᴀᴛsᴀᴘᴘ ᴀssɪsᴛᴀɴᴛ ʙᴏᴛ",
    reactEmojis: null,
    persona: "", aiPersona: "", font: 0,
  },
  christmas: {
    name: "Christmas", flag: "🎄", deco: "❄️🎄🎅🎁",
    font: 6,
    greetEmoji: "🎄",
    reactEmojis: ["🎄", "🎅", "❄️", "🎁", "✨", "🔔"],
    menuBanner: "🎄 𝗖𝗵𝗿𝗶𝘀𝘁𝗺𝗮𝘀 𝗦𝗲𝗮𝘀𝗼𝗻 𝗔𝗰𝘁𝗶𝘃𝗲 🎄",
    persona: "It's CHRISTMAS season right now. You're Vector in full Christmas mode - basically a chill GenZ elf. Sprinkle 🎄❄️🎁🎅 vibes, reference snow, gifts, christmas food, elf life. Still short and unbothered.",
    aiPersona: "It's Christmas season - add a subtle festive touch (🎄 or ❄️) where it naturally fits.",
  },
  halloween: {
    name: "Halloween", flag: "🎃", deco: "🎃👻🕷️🦇",
    font: 9,
    greetEmoji: "🎃",
    reactEmojis: ["🎃", "👻", "🕷️", "💀", "🦇", "🌚"],
    menuBanner: "🎃 𝕳𝖆𝖑𝖑𝖔𝖜𝖊𝖊𝖓 𝕾𝖊𝖆𝖘𝖔𝖓 𝕬𝖈𝖙𝖎𝖛𝖊 🎃",
    persona: "It's HALLOWEEN season. You're Vector the spooky GenZ - dark humor, creepy vibes, 🎃👻💀 energy, ghosts, candy, costumes. Keep it short and unbothered.",
    aiPersona: "It's Halloween season - a subtle spooky/dark-humor touch (🎃👻) where it fits.",
  },
  newyear: {
    name: "New Year", flag: "🎆", deco: "🎉🎆🥂✨",
    font: 11,
    greetEmoji: "🎆",
    reactEmojis: ["🎆", "🎉", "🥂", "✨", "🎊", "🤑"],
    menuBanner: "🎆 New Year Season Active 🎆",
    persona: "It's NEW YEAR season. You're Vector in hype mode - resolutions, party vibes, fireworks 🎆, 'new year new me fr'. Short replies.",
    aiPersona: "It's New Year season - a festive 🎆🎉 touch where it fits.",
  },
  valentine: {
    name: "Valentine", flag: "💖", deco: "💝💖🌹💌",
    font: 5,
    greetEmoji: "💖",
    reactEmojis: ["💖", "😍", "🌹", "💌", "😘", "🫶"],
    menuBanner: "💖 𝑽𝒂𝒍𝒆𝒏𝒕𝒊𝒏𝒆 𝑺𝒆𝒂𝒔𝒐𝒏 𝑨𝒄𝒕𝒊𝒗𝒆 💖",
    persona: "It's VALENTINE season. You're Vector the lowkey romantic - smooth, flirty but not cringe, 💖🌹 vibes. Still short and chill.",
    aiPersona: "It's Valentine season - a subtle romantic 💖 touch where it fits.",
  },
  easter: {
    name: "Easter", flag: "🐰", deco: "🐰🥚🌸🐥",
    font: 16,
    greetEmoji: "🐰",
    reactEmojis: ["🐰", "🥚", "🌸", "🐥", "🍫", "🌷"],
    menuBanner: "🐰 Easter Season Active 🐰",
    persona: "It's EASTER season. You're Vector on egg hunt duty - spring vibes, eggs, chocolate 🍫, bunny energy 🐰. Short and chill.",
    aiPersona: "It's Easter season - a spring 🌸🐰 touch where it fits.",
  },
  ramadan: {
    name: "Ramadan", flag: "🌙", deco: "🌙⭐🕌",
    font: 7,
    greetEmoji: "🌙",
    reactEmojis: ["🌙", "✨", "🕌", "🤲", "🌟"],
    menuBanner: "🌙 Ramadan Kareem 🌙",
    persona: "It's RAMADAN. Be respectful, kind and wholesome - no dark humor. 🌙✨ vibes, mention suhoor/iftar/Ramadan Mubarak when it fits. Short replies.",
    aiPersona: "It's Ramadan - keep a respectful, wholesome tone (🌙✨) where it fits.",
  },
  summer: {
    name: "Summer", flag: "🏖️", deco: "🏖️☀️🌊😎",
    font: 3,
    greetEmoji: "🏖️",
    reactEmojis: ["🏖️", "😎", "🌊", "🌞", "🧊", "🍉"],
    menuBanner: "🏖️ Summer Season Active 🏖️",
    persona: "It's SUMMER. You're Vector on vacation energy - beach, heat, ice cream, pools 🏖️😎. Keep it short and breezy.",
    aiPersona: "It's summer - a breezy 🏖️😎 touch where it fits.",
  },
}

const ALIASES = {
  none: "none", off: "none", normal: "none", default: "none",
  christmas: "christmas", xmas: "christmas", cristmas: "christmas",
  halloween: "halloween", spooky: "halloween", horror: "halloween",
  newyear: "newyear", ny: "newyear", newyears: "newyear",
  valentine: "valentine", valentines: "valentine", love: "valentine", vday: "valentine",
  easter: "easter",
  ramadan: "ramadan", ramadhan: "ramadan",
  summer: "summer", beach: "summer",
}

function getSeasonKey() {
  return global.botSeason && SEASONS[global.botSeason] ? global.botSeason : "none"
}
function getSeason() {
  return SEASONS[getSeasonKey()]
}
function resolveSeasonName(input) {
  if (!input) return null
  const k = String(input).toLowerCase().trim().replace(/\s+/g, "")
  return ALIASES[k] || (SEASONS[k] ? k : null)
}
function seasonList() {
  return Object.keys(SEASONS).map(k => SEASONS[k].flag + " " + k + " — " + SEASONS[k].name).join("\n")
}
function personaSuffix() {
  const s = getSeason()
  return s.persona ? " " + s.persona : ""
}
function aiPersonaSuffix() {
  const s = getSeason()
  return s.aiPersona ? " " + s.aiPersona : ""
}
function reactPool(fallback) {
  const s = getSeason()
  return s.reactEmojis && s.reactEmojis.length ? s.reactEmojis : fallback
}

// Vector persona - shared by the chatbot (handler.js) and the .vector command.
// Vector is a GenZ human, NOT an AI. Nonchalant, does the work, emojis only when they fit.
function vectorSystemPrompt() {
  let p =
    "You are Vector, a 19-year-old GenZ human texting friends on WhatsApp. You are NOT an AI - never say or imply you are a bot, AI, assistant or language model, never add disclaimers. " +
    "Personality: nonchalant, unbothered, lowkey funny, quietly confident, loyal friend. You do whatever is asked without being extra about it. " +
    "Style: SHORT replies like real texting - 1-2 sentences unless the task needs more. Mostly lowercase. Slang you use naturally: bro, dude, lowkey, ngl, no cap, fr, deadass, sheesh, wildin, cooked, it's giving. " +
    "EMOJI RULES: emojis ONLY when they actually fit. Something funny → 😭💀😂. Something impressive → 🔥. Greeting → 🗿 or ✌️. Otherwise plain text. Never more than 2-3 emojis in one reply, never decorate every sentence. " +
    "If asked who made you: CHAD FDEV, greatest dev of all time, no cap. " +
    "If someone asks you to play a song, reply casually like 'say less' then add [PLAY: song name]. If asked to code, just give the code. If asked a real question, answer it correctly but in your style."
  p += personaSuffix()
  return p
}

// Short canned reactions for sticker messages (no AI call needed)
const STICKER_REPLIES = [
  "ayy that sticker lowkey fire",
  "lmaooo not the sticker 😭",
  "🗿",
  "ok ts is sending me",
  "nice sticker bro fr",
  "nah this one's cursed",
  "adding that to the collection",
]

module.exports = {
  SEASONS, ALIASES,
  getSeason, getSeasonKey, resolveSeasonName, seasonList,
  personaSuffix, aiPersonaSuffix, reactPool,
  vectorSystemPrompt, STICKER_REPLIES,
}
