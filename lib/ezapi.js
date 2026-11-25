'use strict'
/**
 * VECTOR MD — ezapi: resilient API fetch helpers.
 * Every new command routes through here so a dead provider never kills a
 * command — chains of providers are tried in order and a human fallback is
 * always available.
 */
const axios = require("axios")

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"

const client = axios.create({
  timeout: 20000,
  headers: { "User-Agent": UA, Accept: "*/*" },
  validateStatus: null,
})

async function getJSON(url, opts = {}) {
  const { data } = await client.get(url, opts)
  return data
}

/**
 * tryChain — run provider functions in order, return first non-null result.
 * Each provider is an async () => value or { value, source }.
 */
async function tryChain(providers, logTag = "ezapi") {
  const errors = []
  for (const p of providers) {
    try {
      const v = await p()
      if (v === null || v === undefined) continue
      return v
    } catch (e) {
      errors.push(e.message?.slice(0, 60))
    }
  }
  if (errors.length) console.log(`⚠️ [${logTag}] all providers failed:`, errors.join(" | "))
  return null
}

// ── JSON walkers (paranoid mode: don't trust the shape, walk it) ──────────────
const URL_RE   = /^https?:\/\//i
const IMG_RE   = /\.(jpe?g|png|gif|webp|bmp)(\?|$)/i
const VID_RE   = /\.(mp4|webm|mov|m4v|mkv)(\?|$)/i
const GOOD_KEY = /(url|image|img|photo|pic|video|vid|link|src|download|media|result|file|content|gif)/i
const BAD_KEY  = /(thumb|avatar|icon|logo|favicon|preview)/i

function walkForUrls(node, keyHint, out = []) {
  if (!node) return out
  if (typeof node === "string") {
    if (URL_RE.test(node)) {
      const isImg = IMG_RE.test(node), isVid = VID_RE.test(node)
      const keyGood = keyHint && GOOD_KEY.test(keyHint)
      const keyBad  = keyHint && BAD_KEY.test(keyHint)
      if (isImg || isVid || (keyGood && !keyBad) || !keyHint) {
        out.push({ url: node, isVid, isImg, keyHint: keyHint || "" })
      }
    }
    return out
  }
  if (Array.isArray(node)) { for (const v of node) walkForUrls(v, keyHint, out); return out }
  if (typeof node === "object") {
    for (const [k, v] of Object.entries(node)) walkForUrls(v, k, out)
  }
  return out
}

/** Pick the most likely media URL from any JSON blob. */
function pickMedia(data, prefer) {
  const cands = walkForUrls(data, "")
  if (!cands.length) return null
  const score = (c) =>
    (prefer === "video" && c.isVid ? 3 : 0) +
    (prefer === "image" && c.isImg ? 3 : 0) +
    (GOOD_KEY.test(c.keyHint) ? 2 : 0) -
    (BAD_KEY.test(c.keyHint) ? 2 : 0)
  cands.sort((a, b) => score(b) - score(a))
  return cands[0]
}

/** Pull the first long-ish text value from any JSON blob. */
function pickText(data) {
  const best = { v: null, len: 0 }
  const walk = (node, key) => {
    if (typeof node === "string") {
      if (URL_RE.test(node)) return
      const goodKey = /(text|joke|quote|content|fact|result|message|answer|value|body|desc)/i.test(key || "")
      if (node.length > best.len && (goodKey || node.length > 12)) { best.v = node; best.len = node.length }
    } else if (Array.isArray(node)) { for (const v of node) walk(v, key) }
    else if (node && typeof node === "object") { for (const [k, v] of Object.entries(node)) walk(v, k) }
  }
  walk(data, "")
  return best.len >= 4 ? best.v : null
}

/** Download any URL to a Buffer (with sane size cap). */
async function downloadBuffer(url, { timeout = 60000, maxBytes = 80 * 1024 * 1024 } = {}) {
  const { data } = await axios.get(url, {
    responseType: "arraybuffer",
    timeout,
    maxContentLength: maxBytes,
    headers: { "User-Agent": UA },
  })
  const buf = Buffer.from(data)
  if (!buf || buf.length < 512) throw new Error("download too small")
  return buf
}

module.exports = { client, getJSON, tryChain, walkForUrls, pickMedia, pickText, downloadBuffer, UA }
