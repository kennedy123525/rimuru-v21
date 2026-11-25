const axios = require("axios")
module.exports = {
  name: "cat",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid
    try {
      const r = await axios.get("https://api.thecatapi.com/v1/images/search", { timeout: 12000 })
      const url = r.data?.[0]?.['url']
      if (url) return await sock.sendMessage(jid, { image: { url }, caption: "🐱 Meow!" })
      sock.sendMessage(jid, { text: "❌ Couldn't fetch image right now." })
    } catch (e) {
      sock.sendMessage(jid, { text: "❌ API unavailable: " + e.message })
    }
  }
}
