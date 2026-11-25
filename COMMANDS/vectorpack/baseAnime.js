const axios = require("axios")

module.exports = (name, endpoint) => ({
  name,
  async execute(sock, msg) {
    const res = await axios.get(`https://api.waifu.pics/sfw/${endpoint}`)

    await sock.sendMessage(msg.key.remoteJid, {
      image: { url: res.data.url }
    })
  }
})