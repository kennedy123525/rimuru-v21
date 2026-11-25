const axios = require("axios")
module.exports = {
  name: "joke",
  async execute(sock, msg) {
    try {
      const r = await axios.get("https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,racist&type=single")
      sock.sendMessage(msg.key.remoteJid, {text:`😂 *Joke*\n\n${r.data.joke}`})
    } catch { sock.sendMessage(msg.key.remoteJid, {text:"Why don't scientists trust atoms? Because they make up everything! 😄"}) }
  }
}