const axios = require("axios")
module.exports = {
  name: "qrcode",
  async execute(sock, msg, args) {
    const text = args.join(" ")
    if (!text) return sock.sendMessage(msg.key.remoteJid, {text:"Usage: .qrcode <text>\nExample: .qrcode https://google.com"})
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(text)}`
      await sock.sendMessage(msg.key.remoteJid, {image:{url}, caption:`🔲 *QR Code*\n\n${text}`})
    } catch { sock.sendMessage(msg.key.remoteJid, {text:"❌ Failed to generate QR code."}) }
  }
}