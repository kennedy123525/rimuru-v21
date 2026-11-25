module.exports = {
  name: "broadcast",
  async execute(sock, msg, args, sender) {
    const config = require("../../lib/vconfig")
    const jid = msg.key.remoteJid
    const owner = config.ownerNumber + "@s.whatsapp.net"
    if (sender !== owner) return sock.sendMessage(jid, { text: "❌ Owner only command." })
    const text = args.join(" ")
    if (!text) return sock.sendMessage(jid, { text: "Usage: .broadcast <message>" })
    sock.sendMessage(jid, { text: "📢 Broadcast sent: " + text })
  }
}
