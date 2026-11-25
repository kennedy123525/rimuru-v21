'use strict'
/**
 * VECTOR MD — Central category map.
 * Command modules stay untouched; the loader applies this map on top so the
 * menu windows are properly organized. Any command not listed here lands in
 * "general" unless the module itself declares a category.
 */
module.exports = {
  // ── owner / bot control ──
  owner: [
    "pair", "adduser", "removeuser", "listusers", "setprefix", "private", "public",
    "broadcast", "block", "unblock", "setbotpp", "setbotseason", "setfont", "fontlist",
    "setcmd", "addcmd", "delcmd", "editcmd", "opencmd", "cmdlist", "addprem", "delprem",
    "listprem", "setsetsauthor", "setsauthor", "autolikestatus", "autotyping", "autorecording",
    "join", "leave", "add", "kick", "kickall", "kickadmins", "promoteall", "demoteall",
    "resetwarn", "warncount", "unwarn", "warn", "resetlink", "setname", "setdesc", "setppgc",
  ],
  // ── AI ──
  ai: [
    "ai", "gpt", "gpt4", "claude", "qwen", "sai", "pai", "code", "wormgpt", "chatbot",
    "clearchatbot", "magicst", "nanottimg", "nanoimgtimg", "gemini", "imagine", "aiimage",
    "summarize", "askai",
  ],
  // ── downloads ──
  downloader: [
    "play", "ytmp3", "ytmp4", "tiktok", "tt", "instagram", "ig", "facebook", "spotify",
    "apk", "movie", "tomp3", "ssweb", "screenshot", "story", "lyrics", "songlyrics",
  ],
  // ── textmakers ──
  textmaker: [
    "glitch", "neon", "sandtext", "cloudtext", "galaxytext", "dragontext", "icetext",
    "watertext", "leathertext", "graffiti", "bloodtext", "goldtext", "neonblue",
    "thundertext", "carbontext", "style1917", "typewriter", "shadowtext", "cup",
    "candle", "flowerstext", "romanticcard", "underwatertext", "pixelglitch",
  ],
  // ── unicode text styles ──
  unicode: [
    "bold", "italic", "bolditalic", "script", "boldscript", "gothic", "gothicbold",
    "doublestruck", "sans", "sansbold", "mono", "bubble", "square", "smallcaps",
    "superscript", "vaporwave", "striketext", "underlinetext", "overline", "zalgo",
    "currencytext", "mirrortext", "alternating", "spaced", "textart", "leet", "mock",
    "reverse", "flip", "backward", "piglatin", "abbreviate", "nato", "cipher",
    "vigenere", "binary", "morse", "demorse", "roman", "encode", "decode", "encode2",
    "b64", "repeat", "randomjoke",
  ],
  // NOTE: economy category removed in v2.1 — Rimuru doesn't run an economy.
  // ── games ──
  games: [
    "dice", "rolldice", "rps", "rps2", "rpsls", "hangman", "math", "math2", "math3",
    "mathchallenge", "solveit", "guess", "trivia", "trivia2", "trivia2answer", "quiz",
    "wordscramble", "scramble", "unscramble", "unscramble2", "emojiquiz", "numbattle",
    "ttt", "tictactoe", "battle", "marry", "wordle", "typingtest", "higherlower",
    "memorygame", "quickmath", "simonsays", "countdown", "timer", "poll", "vote",
    "8ball", "8magic", "truth", "dare", "wyr", "wouldyou", "confess", "complain",
  ],
  // ── group admin ──
  group: [
    "tagall", "tag", "hidetag", "everyone", "who", "grouprules", "editgrouprules",
    "resetgrouprules", "groupjid", "members", "groupinfo", "listadmins", "listonline",
    "opengroup", "closegroup", "invite", "linkgc", "grouplink", "gcpp", "getgrouppp",
    "gcstatus", "gst", "gstatus", "announce", "checkadmin", "creategc", "hotjack",
    "mute", "unmute", "promote", "demote", "welcome", "goodbye",
  ],
  // ── protection ──
  protection: [
    "protect", "antispam", "antitag", "antimention", "antibot", "antibadword",
    "addbadword", "removebadword", "badwordlist", "antilink", "antihijack",
    "antidelete", "groupstats", "whitelist", "muteuser", "unmuteuser", "autoreact",
  ],
  // ── cyber tools ──
  cyber: [
    "ip", "ipinfo", "ip2", "whois", "dns", "dnscheck", "portscan", "portscan2",
    "tracert", "tracert2", "netscan", "networkscan", "urlcheck", "urlcheck2",
    "hashid", "hash", "passcheck", "passcrack", "subnet", "hackdevice", "phoneinfo",
    "ttstalk", "igstalk", "checkdevice", "websc", "sqlinject", "virusscan",
    "systemhack", "spymode", "ipexpose", "phonetrack", "dataleaked", "fakeban",
    "callspoof", "matrix", "hashcheck", "steganography", "fwch", "reactch",
  ],
  // ── reactions ──
  reactions: [
    "hug", "kiss", "slap", "pat", "poke", "bite", "cuddle", "wave", "dance", "cry",
    "blush", "wink", "bonk", "yeet", "nom", "smile", "laugh", "think", "shrug",
    "facepalm", "bored", "angry", "shy", "sleepy", "nope", "happy", "highfive",
    "sorry", "scared", "dizzy", "stare", "punch",
  ],
  // ── animals ──
  animals: [
    "cat", "dog", "fox", "panda", "duck", "bird", "koala", "kangaroo", "raccoon",
    "whale", "rabbit", "bear", "catfact", "catfact2", "dogfact", "dogfact2",
  ],
  // ── stickers ──
  stickers: [
    "sticker", "take", "toimg", "vv", "emoji", "emojimix", "bigemoji", "qrcode",
  ],
  // ── utility ──
  utility: [
    "calc", "calculate", "percentage", "tip", "convert", "weather", "forecast",
    "timezone", "timezone2", "worldclock", "time", "time2", "timestamp", "temp",
    "temperature", "distance", "distance2", "weight", "translate", "translate2",
    "tr", "trans2", "wiki", "wiki2", "define", "dictionary", "thesaurus", "wordcount",
    "palindrome", "palindrome2", "anagram", "anagram2", "anagram3", "isanagram",
    "shorturl", "shorturl2", "currency", "currency2", "rates", "price", "genpass",
    "genpass2", "generate_password", "uuid", "uuid2", "colorpicker", "colorinfo",
    "color", "color2", "randomcolor", "tts", "tts2", "gimage", "httpstatus",
    "hexdecode", "hexencode", "upper", "lower", "titlecase", "lorem", "charcount",
    "ascii", "radix", "readmore", "bmi", "age", "number", "flag", "wordofday",
    "rhyme", "poem", "story", "rap", "solve", "horoscope", "zodiac", "element",
    "birthday", "hbd", "namerating", "namecheck", "personality", "relationship",
    "couple", "couple2", "couplecheck", "lovecalc", "lovetest", "lovemeter",
    "ship", "ship2", "screen", "emojiinfo", "httpcode", "shorts", "triviaanswer",
    "unsolve", "palindrome3", "countdown2", "timer2", "today", "pin", "qod", "wod",
  ],
  // ── fun ──
  fun: [
    "joke", "joke2", "dadjoke", "darkjoke", "fact", "fact2", "funfact", "funfact2",
    "spacefact", "sciencefact", "historyfact", "numberfact", "numberfact2", "quote",
    "quote2", "quote3", "motivation", "motivate", "inspire", "inspire2", "fortune",
    "advice", "riddle", "riddle2", "tongue", "roast", "insult", "pinsult", "flirt",
    "compliment", "compliment2", "pickup", "aura", "clout", "toxic", "rizz", "sigma",
    "drip", "vibes", "sus", "brainrot", "mood", "ratio", "flex", "aesthetic", "iq",
    "chucknorris", "animequote", "friendship", "decide", "argue", "simp", "cap",
    "nickname", "shipname", "pickup2", "wisdom", "randomfact", "mood2", "praise",
  ],
  // ── bot info / general ──
  general: [
    "menu", "help", "ping", "alive", "runtime", "botstatus", "speed", "speedtest",
    "botinfo", "sysinfo", "sysinfo2", "ram", "owner", "repo", "news", "donate",
    "feedback", "thanksto", "jid", "seen", "bio", "afk", "afk2", "del", "gen", "copy",
    "ans", "getpp", "react", "react2", "react3", "whoami", "uptime2", "vector",
    "vectorvn", "ping2", "status", "status2", "donate2", "extras",
  ],
}

// Build reverse lookup with collision-safe defaults
module.exports.lookup = function buildLookup() {
  const out = {}
  for (const [cat, names] of Object.entries(module.exports)) {
    if (!Array.isArray(names)) continue
    for (const n of names) {
      const key = String(n).toLowerCase()
      if (!out[key]) out[key] = cat   // first category wins on collisions
    }
  }
  return out
}
