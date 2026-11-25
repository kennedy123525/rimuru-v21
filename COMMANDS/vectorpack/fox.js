const axios = require("axios")
module.exports = {
  name: "fox",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid
    try {
      const r = await axios.get("https://randomfox.ca/floof/", { timeout: 12000 })
      const url = r.data?.image
      if (url) return await sock.sendMessage(jid, { image: { url }, caption: "🦊 Fox!" })
      sock.sendMessage(jid, { text: "❌ Couldn't fetch image right now." })
    } catch (e) {
      sock.sendMessage(jid, { text: "❌ API unavailable: " + e.message })
    }
  }
}
