module.exports = {
  name: "join",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    const config = require("../../lib/vconfig")
    if (sender !== config.ownerNumber + "@s.whatsapp.net") return sock.sendMessage(jid, { text: "❌ Owner only!" })
    const link = args[0]
    if (!link || !link.includes("chat.whatsapp.com/")) return sock.sendMessage(jid, { text: "Usage: .join <whatsapp invite link>" })
    const code = link.split("chat.whatsapp.com/")[1]?.split(" ")[0]
    if (!code) return sock.sendMessage(jid, { text: "❌ Invalid link." })
    try {
      await sock.groupAcceptInvite(code)
      sock.sendMessage(jid, { text: "✅ Joined group successfully!" })
    } catch (e) { sock.sendMessage(jid, { text: "❌ Failed to join: " + e.message }) }
  }
}
