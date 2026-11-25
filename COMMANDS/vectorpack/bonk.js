const axios = require("axios")
module.exports = {
  name: "bonk",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    const target = args.join(" ") || "you"
    const user = msg.pushName || "Someone"
    try {
      const r = await axios.get("https://nekos.best/api/v2/slap", { timeout: 10000 })
      const url = r.data?.results?.[0]?.url
      if (url) return await sock.sendMessage(jid, {
        image: { url },
        caption: "🔨 *Bonk!*\n\n" + user + " bonks " + target + "!"
      })
    } catch (_) {}
    sock.sendMessage(jid, { text: "🔨 " + user + " bonks " + target + "!" })
  }
}
