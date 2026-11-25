'use strict'
// ── Safe sticker metadata (replaces wa-sticker-formatter toBuffer) ──────────────
// wa-sticker-formatter's conversion pipeline hard-crashes Node in some
// environments (munmap_chunk / native heap corruption). This module does the
// same job with pure-JS pieces only: sharp for webp conversion, plus a
// hand-rolled RIFF/EXIF chunk writer (node-webpmux optional, not required).

async function addStickerMeta(webpBuf, pack, author) {
  const data = JSON.stringify({
    "sticker-pack-id": "com.vectormd",
    "sticker-pack-name": pack || "VECTOR MD",
    "sticker-pack-publisher": author || "CHAD FDEV",
    emojis: ["🤖"],
  })

  // 1) Preferred: node-webpmux when installed
  try {
    const webpmux = require("node-webpmux")
    const img = new webpmux.Image()
    await img.load(webpBuf)
    const exif = buildExif(data)
    img.exif = exif
    return await img.save(null)
  } catch (e) {
    console.log("stickermeta webpmux:", e.message?.slice(0, 50))
  }

  // 2) Fallback: manual RIFF chunk insertion (pure JS, zero deps)
  try {
    return riffInsertExif(webpBuf, data)
  } catch (e) {
    console.log("stickermeta riff:", e.message?.slice(0, 50))
    return webpBuf
  }
}

// Standard 22-byte TIFF header used by wa-sticker-formatter (WhatsApp reads this)
function buildExif(jsonStr) {
  const header = Buffer.from([
    0x49, 0x49, 0x2a, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00,
    0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00
  ])
  const exif = Buffer.concat([header, Buffer.from(jsonStr, "utf-8")])
  exif.writeUIntLE(Buffer.byteLength(jsonStr, "utf-8"), 14, 4)
  return exif
}

// Insert an EXIF chunk into a webp RIFF container without any library
function riffInsertExif(webpBuf, jsonStr) {
  if (!Buffer.isBuffer(webpBuf) || webpBuf.length < 12) throw new Error("bad webp buffer")
  if (webpBuf.toString("ascii", 0, 4) !== "RIFF" || webpBuf.toString("ascii", 8, 12) !== "WEBP") {
    throw new Error("not a RIFF/WEBP file")
  }
  const chunkData = buildExif(jsonStr)
  const chunkHeader = Buffer.alloc(8)
  chunkHeader.write("EXIF", 0, "ascii")
  chunkHeader.writeUInt32LE(chunkData.length, 4)
  const padByte = (chunkData.length % 2 === 1) ? Buffer.from([0x00]) : Buffer.alloc(0)
  const chunk = Buffer.concat([chunkHeader, chunkData, padByte])

  // [RIFF][size][WEBP][existing chunks...] -> append EXIF chunk, rewrite RIFF size
  const head = Buffer.from(webpBuf.subarray(0, 12))
  const rest = Buffer.from(webpBuf.subarray(12))
  const out = Buffer.concat([head, rest, chunk])
  out.writeUInt32LE(out.length - 8, 4)
  return out
}

// image buffer (jpg/png) -> 512x512 webp sticker with metadata
async function imageToSticker(buf, pack, author) {
  const sharp = require("sharp")
  const webp = await sharp(buf)
    .resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 90 })
    .toBuffer()
  return addStickerMeta(webp, pack, author)
}

module.exports = { addStickerMeta, imageToSticker, riffInsertExif, buildExif }
