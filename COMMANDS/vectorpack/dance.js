const axios = require("axios")
module.exports = {
  name: "dance",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    const target = args.join(" ") || "you"
    const user = msg.pushName || "Someone"
    try {
      const r = await axios.get("https://nekos.best/api/v2/dance", { timeout: 10000 })
      const url = r.data?.results?.[0]?.url
      if (url) return await sock.sendMessage(jid, {
        image: { url },
        caption: "💃 *Dance!*\n\n" + user + " dances " + target + "!"
      })
    } catch (_) {}
    sock.sendMessage(jid, { text: "💃 " + user + " dances " + target + "!" })
  }
}
