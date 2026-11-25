const axios = require("axios")
module.exports = {
  name: "duck",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid
    try {
      const r = await axios.get("https://random-d.uk/api/random", { timeout: 12000 })
      const url = r.data?.url
      if (url) return await sock.sendMessage(jid, { image: { url }, caption: "🦆 Quack!" })
      sock.sendMessage(jid, { text: "❌ Couldn't fetch image right now." })
    } catch (e) {
      sock.sendMessage(jid, { text: "❌ API unavailable: " + e.message })
    }
  }
}
