const axios = require("axios")
module.exports = {
  name: "inspire",
  async execute(sock, msg) {
    try {
      const r = await axios.get("https://zenquotes.io/api/random", { timeout: 10000 })
      const q = r.data?.[0]
      if (q) return sock.sendMessage(msg.key.remoteJid, { text: "✨ *Inspiration*\n\n_\"" + q.q + "\"_\n\n— *" + q.a + "*" })
    } catch {}
    sock.sendMessage(msg.key.remoteJid, { text: "✨ *Inspiration*\n\n_\"The best time to start was yesterday. The second best time is now.\"_" })
  }
}
