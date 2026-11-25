const { downloadContentFromMessage } = require("@whiskeysockets/baileys")
const { getNum } = require("../../lib/auth")
const fs   = require("fs")
const path = require("path")
module.exports = {
  name: "setbotpp",
  async execute(sock, msg, args, sender) {
    const jid    = msg.key.remoteJid
    const cfg    = require("../../lib/vconfig")
    if (getNum(sender) !== cfg.ownerNumber) return sock.sendMessage(jid, { text: "❌ Owner only command!" })
    const ctx    = msg.message?.extendedTextMessage?.contextInfo
    const quoted = ctx?.quotedMessage
    const imgMsg = msg.message?.imageMessage || quoted?.imageMessage
    if (!imgMsg) return sock.sendMessage(jid, { text: "📌 Reply to or send an image with .setbotpp to change the menu image!" })
    await sock.sendMessage(jid, { react: { text: "⏳", key: msg.key } })
    try {
      const stream = await downloadContentFromMessage(imgMsg, "image")
      const chunks = []; for await (const c of stream) chunks.push(c)
      const buf = Buffer.concat(chunks)
      const mediaDir = path.join(__dirname, "../media")
      if (!fs.existsSync(mediaDir)) fs.mkdirSync(mediaDir, { recursive: true })
      fs.writeFileSync(path.join(mediaDir, "menu.jpg"), buf)
      await sock.sendMessage(jid, { react: { text: "✅", key: msg.key } })
      await sock.sendMessage(jid, { text: "✅ *Menu image updated!* 🖼️" })
    } catch(e) {
      await sock.sendMessage(jid, { react: { text: "❌", key: msg.key } })
      await sock.sendMessage(jid, { text: "❌ Failed: " + e.message })
    }
  }
}
