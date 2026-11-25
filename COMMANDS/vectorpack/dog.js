const axios = require("axios")
module.exports = {
  name: "dog",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid
    try {
      const r = await axios.get("https://dog.ceo/api/breeds/image/random", { timeout: 12000 })
      const url = r.data?.message
      if (url) return await sock.sendMessage(jid, { image: { url }, caption: "🐶 Woof!" })
      sock.sendMessage(jid, { text: "❌ Couldn't fetch image right now." })
    } catch (e) {
      sock.sendMessage(jid, { text: "❌ API unavailable: " + e.message })
    }
  }
}
