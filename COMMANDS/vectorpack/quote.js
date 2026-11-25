const axios = require("axios")
module.exports = {
  name: "quote",
  async execute(sock, msg) {
    try {
      // zenquotes (quotable.io cert expired)
      const r = await axios.get("https://zenquotes.io/api/random", { timeout: 12000, headers: { "User-Agent": "Mozilla/5.0" } })
      const q = r.data?.[0]
      if (q?.q) return sock.sendMessage(msg.key.remoteJid, {text:`💬 *Quote*\n\n_"${q.q}"_\n\n— *${q.a}*`})
      throw new Error("no quote")
    } catch {
      sock.sendMessage(msg.key.remoteJid, {text:`💬 _"The best time to plant a tree was 20 years ago. The second best time is now."_\n\n— *Chinese Proverb*`})
    }
  }
}
