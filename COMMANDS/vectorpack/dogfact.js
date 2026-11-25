const axios = require("axios")
module.exports = {
  name: "dogfact",
  async execute(sock, msg) {
    try {
      const r = await axios.get("https://dogapi.dog/api/v2/facts?limit=1", { timeout: 10000 })
      sock.sendMessage(msg.key.remoteJid, { text: "🐶 *Dog Fact*\n\n" + r.data?.data?.[0]?.attributes?.body })
    } catch { sock.sendMessage(msg.key.remoteJid, { text: "🐶 A dog's nose print is as unique as a human fingerprint! 🐾" }) }
  }
}
