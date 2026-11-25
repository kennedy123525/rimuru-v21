const axios = require("axios")
module.exports = {
  name: "numberfact",
  async execute(sock, msg, args) {
    const n = args[0] || Math.floor(Math.random()*1000)
    try {
      const r = await axios.get("http://numbersapi.com/" + n, { timeout: 10000 })
      sock.sendMessage(msg.key.remoteJid, { text: "🔢 *Number Fact*\n\n" + r.data })
    } catch { sock.sendMessage(msg.key.remoteJid, { text: "🔢 The number 0 is the only number that is neither positive nor negative!" }) }
  }
}
