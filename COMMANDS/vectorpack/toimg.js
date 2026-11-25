const { downloadContentFromMessage } = require("@whiskeysockets/baileys")

async function dlMedia(mediaMsg, type) {
  const stream = await downloadContentFromMessage(mediaMsg, type)
  const chunks = []
  for await (const chunk of stream) chunks.push(chunk)
  return Buffer.concat(chunks)
}

module.exports = {
  name: "toimg",
  async execute(sock, msg) {
    const jid    = msg.key.remoteJid
    const ctx    = msg.message?.extendedTextMessage?.contextInfo
    const quoted = ctx?.quotedMessage
    const stkMsg = quoted?.stickerMessage || msg.message?.stickerMessage
    if (!stkMsg) return sock.sendMessage(jid, { text: "📌 Reply to a sticker with .toimg to convert to image!" })

    await sock.sendMessage(jid, { react: { text: "⏳", key: msg.key } })
    try {
      const buffer = await dlMedia(stkMsg, "sticker")
      await sock.sendMessage(jid, { image: buffer, caption: "🖼️ Here's the image!" })
      await sock.sendMessage(jid, { react: { text: "✅", key: msg.key } })
    } catch(e) {
      await sock.sendMessage(jid, { react: { text: "❌", key: msg.key } })
      await sock.sendMessage(jid, { text: "❌ Failed: " + e.message })
    }
  }
}
