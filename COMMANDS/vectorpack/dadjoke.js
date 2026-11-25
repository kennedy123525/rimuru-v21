const axios = require("axios")
module.exports = {
  name: "dadjoke",
  async execute(sock, msg) {
    try {
      const r = await axios.get("https://icanhazdadjoke.com/", {headers:{Accept:"application/json"}})
      sock.sendMessage(msg.key.remoteJid, {text:`👨 *Dad Joke*\n\n${r.data.joke}`})
    } catch { sock.sendMessage(msg.key.remoteJid, {text:"👨 Why did the scarecrow win an award? He was outstanding in his field! 😂"}) }
  }
}