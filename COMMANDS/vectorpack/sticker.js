const { downloadContentFromMessage } = require("@whiskeysockets/baileys")
const axios = require("axios")
const fs    = require("fs")
const path  = require("path")
const os    = require("os")
const { addStickerMeta } = require("../../lib/stickermeta")
async function dlMedia(m, t) {
  const s = await downloadContentFromMessage(m, t)
  const c = []; for await (const x of s) c.push(x); return Buffer.concat(c)
}
async function toWebpImage(buf, author, pack) {
  // sharp -> webp -> EXIF metadata (pure JS, no wa-sticker-formatter crash risk)
  const sharp = require("sharp")
  const webp = await sharp(buf)
    .resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 90 })
    .toBuffer()
  return addStickerMeta(webp, pack, author)
}
async function toWebpVideo(buf, author, pack) {
  // ffmpeg -> animated webp -> EXIF metadata (uses PATH ffmpeg or ffmpeg-static)
  const tmpIn  = path.join(os.tmpdir(),"vstkv_"+Date.now()+".mp4")
  const tmpOut = path.join(os.tmpdir(),"vstkv_"+Date.now()+".webp")
  try {
    fs.writeFileSync(tmpIn, buf)
    let ff = "ffmpeg"
    try { if (require("ffmpeg-static")) ff = require("ffmpeg-static") } catch {}
    await new Promise((res,rej) => require("child_process").exec(
      `"${ff}" -y -i "${tmpIn}" -vf "scale=512:512:force_original_aspect_ratio=decrease,fps=15" -t 6 -vcodec libwebp -lossless 0 -q:v 50 -loop 0 -preset default -an -vsync 0 "${tmpOut}"`,
      {timeout:30000}, (err)=>err?rej(err):res()
    ))
    const webp = fs.readFileSync(tmpOut)
    for(const f of [tmpIn,tmpOut]){try{fs.unlinkSync(f)}catch{}}
    return await addStickerMeta(webp, pack, author)
  } catch {}
  for(const f of [tmpIn,tmpOut]){try{if(fs.existsSync(f))fs.unlinkSync(f)}catch{}}
  return buf
}
module.exports = {
  name: "sticker",
  async execute(sock, msg, args) {
    const jid    = msg.key.remoteJid
    const ctx    = msg.message?.extendedTextMessage?.contextInfo
    const quoted = ctx?.quotedMessage
    const imgMsg = msg.message?.imageMessage || quoted?.imageMessage
    const vidMsg = msg.message?.videoMessage || quoted?.videoMessage || quoted?.gifMessage
    const stkMsg = quoted?.stickerMessage || msg.message?.stickerMessage
    if (!imgMsg && !vidMsg && !stkMsg) return sock.sendMessage(jid, {
      text: "📌 *Sticker Maker*\n\n• Send image + `.sticker`\n• Reply to image with `.sticker`\n• Reply to video/gif with `.sticker` (animated)\n\n💡 Set author: .setsauthor YourName"
    })
    await sock.sendMessage(jid, { react: { text: "⏳", key: msg.key } })
    const author = global.stickerAuthor || require("../../lib/vconfig").ownerName
    const pack   = "VECTOR MD"
    try {
      if (stkMsg && !imgMsg && !vidMsg) {
        const buf = await dlMedia(stkMsg, "sticker")
        await sock.sendMessage(jid, { sticker: buf, stickerAuthor: author, stickerName: pack, stickerPackId: "com.vectormd" })
      } else if (imgMsg) {
        await sock.sendMessage(jid, { text: "⏳ Creating image sticker..." })
        const raw  = await dlMedia(imgMsg, "image")
        const webp = await toWebpImage(raw, author, pack)
        await sock.sendMessage(jid, { sticker: webp, stickerAuthor: author, stickerName: pack, stickerPackId: "com.vectormd" })
      } else if (vidMsg) {
        await sock.sendMessage(jid, { text: "⏳ Creating video sticker (may take 30s)..." })
        const raw  = await dlMedia(vidMsg, "video")
        const webp = await toWebpVideo(raw, author, pack)
        await sock.sendMessage(jid, { sticker: webp, stickerAuthor: author, stickerName: pack, stickerPackId: "com.vectormd" })
      }
      await sock.sendMessage(jid, { react: { text: "✅", key: msg.key } })
    } catch(e) {
      await sock.sendMessage(jid, { react: { text: "❌", key: msg.key } })
      await sock.sendMessage(jid, { text: "❌ Sticker failed: " + e.message })
    }
  }
}
