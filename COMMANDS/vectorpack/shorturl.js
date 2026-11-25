const axios = require("axios")
module.exports = {
  name: "shorturl",
  async execute(sock, msg, args) {
    const url = args[0]
    if (!url) return sock.sendMessage(msg.key.remoteJid, {text:"Usage: .shorturl <url>\nExample: .shorturl https://google.com"})
    try {
      const r = await axios.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`)
      sock.sendMessage(msg.key.remoteJid, {text:`🔗 *Short URL*\n\nOriginal: ${url}\nShort: *${r.data}*`})
    } catch { sock.sendMessage(msg.key.remoteJid, {text:"❌ Failed to shorten URL."}) }
  }
}