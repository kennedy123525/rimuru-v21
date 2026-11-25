const axios = require("axios")
module.exports = {
  name: "bird",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid
    try {
      const r = await axios.get("https://some-random-api.com/animal/birb", { timeout: 12000 })
      const url = r.data?.image
      if (url) return await sock.sendMessage(jid, { image: { url }, caption: "🐦 Tweet!" })
      sock.sendMessage(jid, { text: "❌ Couldn't fetch image right now." })
    } catch (e) {
      sock.sendMessage(jid, { text: "❌ API unavailable: " + e.message })
    }
  }
}
