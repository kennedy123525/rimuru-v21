'use strict'
/**
 * VECTOR MD — Textmaker engine (ephoto360 / textpro / photooxy via mumaker)
 * Each command = one effect. Primary provider ephoto360, fallback textpro.
 * The engine never throws at load time — all failures happen at runtime and
 * commands reply with a clean error message.
 */
const mumaker = require("mumaker")

const EPHOTO = {
  glitch:       "https://en.ephoto360.com/create-digital-glitch-text-effects-online-767.html",
  neon:         "https://en.ephoto360.com/create-colorful-neon-light-text-effects-online-797.html",
  neonblue:     "https://en.ephoto360.com/create-neon-blue-text-effect-online-120.html",
  sandtext:     "https://en.ephoto360.com/write-names-on-sand-summer-beach-321.html",
  cloudtext:    "https://en.ephoto360.com/effect-clouds-text-online-510.html",
  galaxytext:   "https://en.ephoto360.com/create-galaxy-text-effect-online-639.html",
  dragontext:   "https://en.ephoto360.com/create-dragon-glitter-text-effect-online-339.html",
  icetext:      "https://en.ephoto360.com/ice-text-effect-online-112.html",
  watertext:    "https://en.ephoto360.com/create-water-effect-text-online-508.html",
  leathertext:  "https://en.ephoto360.com/leather-text-effect-online-109.html",
  graffiti:     "https://en.ephoto360.com/create-graffiti-text-effect-on-wall-71.html",
  bloodtext:    "https://en.ephoto360.com/blood-text-effect-online-107.html",
  goldtext:     "https://en.ephoto360.com/gold-text-effect-online-135.html",
  thundertext:  "https://en.ephoto360.com/thunder-text-effect-online-97.html",
  carbontext:   "https://en.ephoto360.com/create-carbon-text-effect-online-110.html",
  style1917:    "https://en.ephoto360.com/style-1917-text-effect-online-484.html",
  typewriter:   "https://en.ephoto360.com/create-typography-typewriter-text-effect-online-601.html",
  underwatertext: "https://en.ephoto360.com/create-underwater-text-effect-online-495.html",
  pixelglitch:  "https://en.ephoto360.com/create-pixel-glitch-text-effect-online-768.html",
}

const PHOTOOXY = {
  shadowtext:    "https://photooxy.com/logo-and-text-online/make-shadow-text-online-347.html",
  cup:           "https://photooxy.com/logo-and-text-online/put-text-on-a-cup-309.html",
  candle:        "https://photooxy.com/other-effect/candle-light-text-effect-352.html",
  flowerstext:   "https://photooxy.com/art-effects/flowers-text-effect-350.html",
  romanticcard:  "https://photooxy.com/logo-and-text-online/romantic-messages-for-your-loved-one-315.html",
}

const TEXTPRO_FALLBACK = "https://textpro.me/create-neon-devil-wings-text-effect-online-free-1014.html"

async function render(effectKey, text) {
  if (EPHOTO[effectKey]) {
    try {
      const url = await mumaker.ephoto(EPHOTO[effectKey], text)
      const link = typeof url === "string" ? url : (url?.image || url?.url || url?.link)
      if (link && /^https?:\/\//.test(link)) return { url: link, provider: "ephoto360" }
    } catch {}
  }
  if (PHOTOOXY[effectKey]) {
    try {
      const url = await mumaker.photooxy(PHOTOOXY[effectKey], text)
      const link = typeof url === "string" ? url : (url?.image || url?.url || url?.link)
      if (link && /^https?:\/\//.test(link)) return { url: link, provider: "photooxy" }
    } catch {}
  }
  try {
    const url = await mumaker.textpro(TEXTPRO_FALLBACK, text)
    const link = typeof url === "string" ? url : (url?.image || url?.url || url?.link)
    if (link && /^https?:\/\//.test(link)) return { url: link, provider: "textpro" }
  } catch {}
  throw new Error("all textmaker providers are busy — try again in a minute")
}

module.exports = { render, EPHOTO, PHOTOOXY }
