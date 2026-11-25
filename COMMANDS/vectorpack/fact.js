const axios = require("axios")
module.exports = {
  name: "fact",
  async execute(sock, msg) {
    try {
      const r = await axios.get("https://uselessfacts.jsph.pl/random.json?language=en")
      sock.sendMessage(msg.key.remoteJid, {text:`💡 *Random Fact*\n\n${r.data.text}`})
    } catch { sock.sendMessage(msg.key.remoteJid, {text:"💡 A group of flamingos is called a 'flamboyance'! 🦩"}) }
  }
}