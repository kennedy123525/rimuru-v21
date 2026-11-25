const { downloadContentFromMessage } = require("@whiskeysockets/baileys")
const { addStickerMeta } = require("../../lib/stickermeta")
async function dlMedia(m, t) { const s=await downloadContentFromMessage(m,t); const c=[]; for await(const x of s)c.push(x); return Buffer.concat(c) }
module.exports = {
  name: "take",
  async execute(sock, msg) {
    const jid    = msg.key.remoteJid
    const ctx    = msg.message?.extendedTextMessage?.contextInfo
    const quoted = ctx?.quotedMessage
    const stkMsg = quoted?.stickerMessage || msg.message?.stickerMessage
    const vidMsg = quoted?.videoMessage || quoted?.gifMessage
    if (!stkMsg && !vidMsg) return sock.sendMessage(jid, { text: "📌 Reply to a sticker/video sticker with .take\n\n💡 Set author: .setsauthor YourName" })
    await sock.sendMessage(jid, { react: { text: "⏳", key: msg.key } })
    const author = global.stickerAuthor || require("../../lib/vconfig").ownerName
    const pack   = "VECTOR MD"
    try {
      let buf = stkMsg ? await dlMedia(stkMsg, "sticker") : await dlMedia(vidMsg, "video")
      // Rebrand: write VECTOR MD metadata onto the sticker (webp -> exif chunk)
      let finalBuf = buf
      try {
        const sharp = require("sharp")
        const webp = await sharp(buf)
          .resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
          .webp({ quality: 90 })
          .toBuffer()
        finalBuf = await addStickerMeta(webp, pack, author)
      } catch {}
      await sock.sendMessage(jid, { sticker: finalBuf, stickerAuthor: author, stickerName: pack, stickerPackId: "com.vectormd" })
      await sock.sendMessage(jid, { react: { text: "✅", key: msg.key } })
    } catch(e) {
      await sock.sendMessage(jid, { react: { text: "❌", key: msg.key } })
      await sock.sendMessage(jid, { text: "❌ Take failed: " + e.message })
    }
  }
}
