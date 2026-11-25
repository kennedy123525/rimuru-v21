'use strict'
// ── VECTOR MD downloader core ────────────────────────────────────────────────────
// Shared media-download helpers. Endpoints verified live 2026-11-22:
//   prexzyapis /search/youtube, /download/aio (proxy CDN, NOT ip-locked),
//   /download/facebookv2, /download/instagram, /download/spotify, /download/tiktok
//   davidcyril /lyrics?t&a, /apk/search, /apk/aptoide?package, /instagram, /facebook
// NOTE: prexzy /download/ytmp3|ytmp4 return googlevideo URLs locked to their
// server IP (403 for everyone else) - that's why .play was broken before.
// The aio pipeline returns proxied URLs that work from ANY network.

const axios = require("axios")

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
const BASE = "https://prexzyapis.com"
const DC   = "https://apis.davidcyril.name.ng"

// ── low-level helpers ────────────────────────────────────────────────────────────
async function getJSON(url, timeout = 25000, headers = {}) {
  const r = await axios.get(url, {
    timeout, headers: { "User-Agent": UA, "Accept": "application/json", ...headers },
    maxRedirects: 5, validateStatus: s => s < 500,
  })
  if (r.data && typeof r.data === "string" && r.data.trim().startsWith("<")) throw new Error("html response")
  return r.data
}

async function dlBuffer(url, { timeout = 120000, maxBytes = 90 * 1024 * 1024, minBytes = 8000, headers = {} } = {}) {
  const resp = await axios.get(url, {
    responseType: "arraybuffer", timeout,
    maxContentLength: maxBytes, maxRedirects: 5,
    headers: { "User-Agent": UA, "Accept": "*/*", ...headers },
  })
  const buf = Buffer.from(resp.data)
  if (buf.length < minBytes) throw new Error("file too small (" + buf.length + " bytes)")
  return buf
}

// Recursively collect every http(s) URL inside an unknown JSON shape and
// classify them - resilient against API response format changes.
function deepUrls(obj, out) {
  if (!out) out = { videos: [], images: [], audio: [], other: [] }
  if (typeof obj === "string") {
    const m = obj.match(/https?:\/\/[^\s"'<>\\]+/g)
    if (m) for (const u of m) {
      const clean = u.replace(/\\u0026/g, "&").replace(/\\"/g, "")
      if (/\.mp4(\?|$)|\/video\/|videoplayback|mime=video/i.test(clean)) out.videos.push(clean)
      else if (/\.mp3(\?|$)|\.m4a(\?|$)|mime=audio|\/music\/|\.opus(\?|$)/i.test(clean)) out.audio.push(clean)
      else if (/\.(jpg|jpeg|png|webp)(\?|$)|\/photo\/|scontent.*\.jpg/i.test(clean)) out.images.push(clean)
      else out.other.push(clean)
    }
    return out
  }
  if (Array.isArray(obj)) { for (const v of obj) deepUrls(v, out); return out }
  if (obj && typeof obj === "object") { for (const k of Object.keys(obj)) deepUrls(obj[k], out); return out }
  return out
}

// ── YouTube search + aio pipeline (verified working) ─────────────────────────────
async function ytSearch(query) {
  const d = await getJSON(BASE + "/search/youtube?q=" + encodeURIComponent(query), 15000)
  const v = d?.data?.[0]
  if (!v?.link) throw new Error("no search result")
  return { link: v.link, title: v.title || query, thumbnail: v.imageUrl, channel: v.channel, duration: v.duration }
}

function pickMedia(medias, kind, maxQ) {
  if (!Array.isArray(medias)) return null
  if (kind === "audio") {
    for (const q of [maxQ || "128kbps", "128kbps", "256kbps", "320kbps", "default"]) {
      const m = medias.find(x => (x.quality || "").toLowerCase() === q.toLowerCase() && /audio|mp3|m4a/i.test(x.label || x.quality || ""))
      if (m?.url) return m
    }
    return medias.find(m => /audio|mp3|m4a/i.test(m.label || "") || /ext=mp3|ext=m4a/i.test(m.url || "")) || null
  }
  // video: never above maxQ, prefer exact then smaller (WhatsApp-friendly sizes)
  const order = { "2160p": ["1080p", "720p", "480p", "360p", "240p", "144p"], "1440p": ["720p", "480p", "360p", "240p", "144p"], "1080p": ["720p", "480p", "360p", "240p", "144p"], "720p": ["480p", "360p", "240p", "144p"], "480p": ["360p", "240p", "144p"], "360p": ["240p", "144p"], "240p": ["144p"], "144p": [] }
  const prefs = order[maxQ || "360p"] || ["360p", "240p", "144p"]
  const tryList = [maxQ, ...prefs].filter(Boolean)
  for (const q of tryList) {
    const m = medias.find(x => (x.quality || "").toLowerCase() === String(q).toLowerCase() && /mp4/i.test(x.label || x.url || ""))
    if (m?.url) return m
  }
  return medias.find(m => /mp4/i.test(m.label || m.url || "")) || null
}

// aio returns an SSE progress endpoint; follow it until the final download_url
async function aioWaitFinal(progressUrl, timeoutMs = 110000) {
  const r = await axios.get(progressUrl, {
    timeout: timeoutMs, responseType: "text",
    headers: { "User-Agent": UA, "Accept": "text/event-stream" },
    maxRedirects: 0, validateStatus: s => s < 500,
  })
  const text = typeof r.data === "string" ? r.data : String(r.data)
  let final = null
  for (const line of text.split("\n")) {
    if (!line.startsWith("data:")) continue
    try {
      const j = JSON.parse(line.slice(5).trim())
      if (j.download_url) final = j
    } catch {}
  }
  if (!final?.download_url) throw new Error("conversion did not finish")
  return final
}

async function ytResolve(input, kind, maxQ) {
  const isUrl = /youtu\.be|youtube\.com/i.test(input)
  let link = input, title = input, thumbnail = null
  if (!isUrl) { const s = await ytSearch(input); link = s.link; title = s.title; thumbnail = s.thumbnail }
  const d = await getJSON(BASE + "/download/aio?url=" + encodeURIComponent(link), 40000)
  const media = pickMedia(d?.data?.medias, kind, maxQ)
  if (!media?.url) throw new Error("no suitable media found")
  if (d?.data?.title) title = d.data.title
  if (!thumbnail) thumbnail = d?.data?.thumbnail
  const final = await aioWaitFinal(media.url)
  return { url: final.download_url, title, thumbnail, size: final.file_info?.size || 0 }
}

async function ytAudio(input) {
  const r = await ytResolve(input, "audio", "128kbps")
  const isM4a = /ext=m4a|\.m4a/i.test(r.url)
  const buffer = await dlBuffer(r.url, { timeout: 150000 })
  return { ...r, buffer, mimetype: isM4a ? "audio/mp4" : "audio/mpeg", ext: isM4a ? "m4a" : "mp3" }
}

async function ytVideo(input, maxQ) {
  const r = await ytResolve(input, "video", maxQ || "360p")
  const buffer = await dlBuffer(r.url, { timeout: 180000 })
  return { ...r, buffer, mimetype: "video/mp4" }
}

// ── TikTok (multi-strategy; region-blocked APIs vary by network) ─────────────────
async function tiktokDl(url) {
  const out = { videos: [], images: [], audio: null, title: "", cover: "", author: "", source: "" }

  try { // tikwm - standard on residential IPs
    const d = await getJSON("https://www.tikwm.com/api/?url=" + encodeURIComponent(url) + "&hd=1", 30000)
    const data = d?.data
    if (data && d.code === 0) {
      const abs = u => u ? (u.startsWith("http") ? u : "https://www.tikwm.com" + u) : null
      if (data.play) out.videos.push(abs(data.play))
      if (data.hdplay) out.videos.unshift(abs(data.hdplay))
      if (data.music) out.audio = abs(data.music)
      if (Array.isArray(data.images) && data.images.length) {
        out.images = data.images.map(abs).filter(Boolean)
        out.videos = []
      }
      out.title = data.title || ""
      out.cover = abs(data.cover) || ""
      out.author = data.author?.nickname || ""
      out.source = "tikwm"
    }
  } catch {}

  if (!out.videos.length && !out.images.length) {
    try { // prexzy tiktok
      const d = await getJSON(BASE + "/download/tiktok?url=" + encodeURIComponent(url), 40000)
      const u = deepUrls(d)
      if (u.videos.length || u.images.length) {
        out.videos = u.videos.slice(0, 2); out.images = u.images.slice(0, 10)
        out.audio = u.audio[0] || null
        out.title = d?.data?.title || d?.title || ""
        out.source = "prexzy"
      }
    } catch {}
  }

  if (!out.videos.length && !out.images.length) {
    try { // davidcyril tiktokv3
      const d = await getJSON(DC + "/download/tiktokv3?url=" + encodeURIComponent(url), 40000)
      const u = deepUrls(d)
      if (u.videos.length || u.images.length) {
        out.videos = u.videos.slice(0, 2); out.images = u.images.slice(0, 10)
        out.title = d?.result?.title || d?.title || ""
        out.source = "davidcyril"
      }
    } catch {}
  }

  if (!out.videos.length && !out.images.length) throw new Error("TikTok backend is down - try again later")
  return out
}

// ── Instagram (notoriously unstable - always chain) ─────────────────────────────
async function instagramDl(url) {
  const strategies = [
    async () => getJSON(BASE + "/download/instagram?url=" + encodeURIComponent(url), 45000),
    async () => getJSON(BASE + "/download/igv2?url=" + encodeURIComponent(url), 45000),
    async () => getJSON(DC + "/instagram?url=" + encodeURIComponent(url), 45000),
    async () => getJSON(BASE + "/download/igv3?url=" + encodeURIComponent(url), 45000),
  ]
  let best = null
  for (const fn of strategies) {
    try {
      const d = await fn()
      const u = deepUrls(d)
      const media = u.videos[0] || u.images[0]
      if (media) { best = { video: u.videos[0] || null, image: u.images[0] || null, all: u, title: d?.data?.title || d?.title || "" }; break }
    } catch {}
  }
  if (!best) throw new Error("Instagram backend is down or the post is private")
  return best
}

// ── Facebook ─────────────────────────────────────────────────────────────────────
async function facebookDl(url) {
  try { // prexzy facebookv2 - verified (snapcdn proxy URLs)
    const d = await getJSON(BASE + "/download/facebookv2?url=" + encodeURIComponent(url), 45000)
    const links = d?.data?.download_links || []
    const sd = links.find(l => (l.quality || "").toLowerCase().includes("sd"))?.url || links[0]?.url
    const hd = links.find(l => (l.quality || "").toLowerCase().includes("hd"))?.url || null
    if (sd || hd) return { video: hd || sd, sd, hd, thumbnail: d?.data?.thumbnail, title: d?.data?.title || "" }
  } catch {}
  try { // davidcyril facebook
    const d = await getJSON(DC + "/facebook?url=" + encodeURIComponent(url), 45000)
    const u = deepUrls(d)
    if (u.videos.length) return { video: u.videos[0], sd: u.videos[0], hd: u.videos[0], title: d?.result?.title || "" }
  } catch {}
  throw new Error("Facebook backend is down - try again later")
}

// ── APK (aptoide official public API - keyless, unlimited) ───────────────────────
async function apkSearch(query) {
  try {
    const d = await getJSON("https://ws75.aptoide.com/api/7/apps/search?query=" + encodeURIComponent(query) + "&limit=5", 25000)
    const apps = d?.datalist?.list || []
    if (apps.length) return apps.map(a => ({
      name: a.name, package: a.package, version: a.file?.vername,
      sizeMB: a.file?.filesize ? Math.round(a.file.filesize / 1024 / 1024) : (a.size ? Math.round(a.size / 1024 / 1024) : null),
      icon: a.icon, url: a.file?.path || null, trust: a.file?.malware?.rank || "",
    }))
  } catch {}
  // davidcyril fallback (guest-limited to ~15 req/day per IP)
  const d = await getJSON(DC + "/apk/search?query=" + encodeURIComponent(query), 30000)
  const apps = d?.result?.sources?.aptoide?.apps || d?.result?.sources?.fdroid?.apps || []
  if (!apps.length) throw new Error("no APK found for '" + query + "'")
  return apps.slice(0, 5).map(a => ({
    name: a.name, package: a.package, version: a.version,
    sizeMB: a.size ? Math.round(a.size / 1024 / 1024) : null, icon: a.icon,
  }))
}

async function apkGet(query) {
  try { // aptoide direct - verified direct APK url
    const d = await getJSON("https://ws75.aptoide.com/api/7/apps/search?query=" + encodeURIComponent(query) + "&limit=1", 25000)
    const a = d?.datalist?.list?.[0]
    if (a?.file?.path) return {
      name: a.name, version: a.file.vername,
      sizeMB: Math.round(a.file.filesize / 1024 / 1024),
      icon: a.icon, url: a.file.path, trust: a.file.malware?.rank || "",
    }
  } catch {}
  const apps = await apkSearch(query)
  const pkg = apps[0].package
  const d = await getJSON(DC + "/apk/aptoide?package=" + encodeURIComponent(pkg), 30000)
  const r = d?.result
  if (!r?.download_url) throw new Error("APK download link unavailable")
  return { name: r.name || apps[0].name, version: r.version, sizeMB: r.size ? Math.round(r.size / 1024 / 1024) : apps[0].sizeMB, icon: r.icon, url: r.download_url }
}

// ── Spotify (prexzy - verified) ──────────────────────────────────────────────────
async function spotifyDl(url) {
  const d = await getJSON(BASE + "/download/spotify?url=" + encodeURIComponent(url), 45000)
  const dl = d?.data?.download_url
  if (!dl) throw new Error("spotify download unavailable")
  return { title: d.data.title, artist: d.data.artist, cover: d.data.cover, url: dl }
}

// spotify search -> track url (davidcyril, guest-limited; may return null)
async function spotifySearch(query) {
  try {
    const d = await getJSON(DC + "/search/spotify?text=" + encodeURIComponent(query), 20000)
    const items = d?.result?.items || d?.result || d?.data || []
    const t = Array.isArray(items) ? items.find(x => x.url || x.link || x.spotify_url) : null
    if (t) return { url: t.url || t.link || t.spotify_url, title: t.title || t.name, artist: t.artist || (t.artists || [])[0]?.name || "" }
  } catch {}
  return null
}

// ── Lyrics (lrclib.net official public API - keyless, unlimited) ─────────────────
async function lyricsDl(title, artist) {
  try {
    const q = artist ? artist + " " + title : title
    const list = await getJSON("https://lrclib.net/api/search?q=" + encodeURIComponent(q), 25000)
    const hit = Array.isArray(list) ? (list.find(x => !x.instrumental && (x.plainLyrics || "").length > 50) || list[0]) : null
    if (hit?.plainLyrics) return { title: hit.trackName || title, artist: hit.artistName || artist || "", lyrics: hit.plainLyrics }
  } catch {}
  // davidcyril fallback (guest-limited)
  try {
    const d = await getJSON(DC + "/lyrics?t=" + encodeURIComponent(title) + (artist ? "&a=" + encodeURIComponent(artist) : ""), 25000)
    if (d?.lyrics) return { title: d.title || title, artist: d.artist || artist || "", lyrics: String(d.lyrics) }
  } catch {}
  throw new Error("lyrics not found")
}

// ── Movies (cinemeta public API - keyless; davidcyril fallback) ──────────────────
async function movieSearch(query) {
  const out = []
  try {
    const d = await getJSON("https://v3-cinemeta.strem.io/catalog/movie/top/search=" + encodeURIComponent(query) + ".json", 25000)
    for (const m of (d?.metas || []).slice(0, 4)) out.push({
      title: m.name, year: (m.releaseInfo || "").slice(0, 4), rating: m.imdbRating || "",
      poster: (m.poster || "").replace("/small/", "/medium/"), description: (m.description || "").slice(0, 400), type: "movie",
    })
  } catch {}
  if (!out.length) try { // series search
    const d = await getJSON("https://v3-cinemeta.strem.io/catalog/series/top/search=" + encodeURIComponent(query) + ".json", 25000)
    for (const m of (d?.metas || []).slice(0, 3)) out.push({
      title: m.name, year: (m.releaseInfo || "").slice(0, 4), rating: m.imdbRating || "",
      poster: (m.poster || "").replace("/small/", "/medium/"), description: (m.description || "").slice(0, 400), type: "series",
    })
  } catch {}
  if (!out.length) try { // davidcyril fallback (guest-limited)
    const d = await getJSON(DC + "/movies/search?q=" + encodeURIComponent(query), 30000)
    const list = d?.result?.list || d?.result || d?.data
    const arr = Array.isArray(list) ? list : (list ? [list] : [])
    for (const m of arr.slice(0, 5)) out.push({
      title: m.title || m.name || query, year: m.year || m.release_date || "",
      rating: m.rating || m.vote_average || "", poster: m.poster || m.image || "",
      description: (m.description || m.synopsis || m.overview || "").slice(0, 400), type: m.type || "",
    })
  } catch {}
  return out
}

// ── Image search (wikimedia commons public API - keyless) ────────────────────────
// Wikimedia robot policy requires a descriptive bot UA with a contact URL,
// browser UAs get 403-walled.
const WIKI_UA = "VECTOR-MD/2.0 (WhatsApp bot; +https://github.com/vector-md)"
async function imageSearch(query) {
  try {
    const d = await getJSON("https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=" +
      encodeURIComponent(query) + "&gsrnamespace=6&gsrlimit=6&prop=imageinfo&iiprop=url&iiurlwidth=900", 25000, { "User-Agent": WIKI_UA })
    const pages = Object.values(d?.query?.pages || {})
    const urls = pages.map(p => (p.imageinfo?.[0]?.thumburl || p.imageinfo?.[0]?.url || "").split("?")[0]).filter(Boolean)
    if (urls.length) return urls.slice(0, 5)
  } catch {}
  throw new Error("no images found")
}

module.exports = {
  UA, WIKI_UA, getJSON, dlBuffer, deepUrls,
  ytSearch, ytAudio, ytVideo,
  tiktokDl, instagramDl, facebookDl,
  apkSearch, apkGet, spotifyDl, spotifySearch,
  lyricsDl, movieSearch, imageSearch,
}
