const axios = require("axios")
module.exports = {
  name: "catfact",
  async execute(sock, msg) {
    try {
      const r = await axios.get("https://catfact.ninja/fact", { timeout: 10000 })
      sock.sendMessage(msg.key.remoteJid, { text: "🐱 *Cat Fact*\n\n" + r.data.fact })
    } catch { sock.sendMessage(msg.key.remoteJid, { text: "🐱 Cats sleep 12-16 hours a day! 😴" }) }
  }
}
