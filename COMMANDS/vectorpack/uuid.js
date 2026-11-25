const crypto = require("crypto")
module.exports = {
  name: "uuid",
  async execute(sock, msg) {
    const id = crypto.randomUUID()
    sock.sendMessage(msg.key.remoteJid, { text: "🔑 *Generated UUID:*\n\n\`" + id + "\`" })
  }
}
