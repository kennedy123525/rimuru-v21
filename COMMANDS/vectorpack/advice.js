const axios = require("axios")
module.exports = {
  name: "advice",
  async execute(sock, msg) {
    try {
      const r = await axios.get("https://api.adviceslip.com/advice")
      sock.sendMessage(msg.key.remoteJid, {text:`🧠 *Advice*\n\n_"${r.data.slip.advice}"_`})
    } catch { sock.sendMessage(msg.key.remoteJid, {text:`🧠 *Advice*\n\n_"Don't compare yourself to others. Compare yourself to who you were yesterday."_`}) }
  }
}