module.exports = {
  name: "leave",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    if (!jid.endsWith("@g.us")) return sock.sendMessage(jid, { text: "❌ This command is for leaving groups only." })
    const config = require("../../lib/vconfig")
    // Only owner can make the bot leave
    if (sender !== config.ownerNumber + "@s.whatsapp.net") return sock.sendMessage(jid, { text: "❌ Only the owner can make the bot leave a group." })
    await sock.sendMessage(jid, { text: "👋 *VECTOR MD is leaving this group.*\n\nGoodbye everyone! 🤖" })
    await new Promise(r => setTimeout(r, 2000))
    try { await sock.groupLeave(jid) } catch (e) { sock.sendMessage(jid, { text: "❌ Failed to leave: " + e.message }) }
  }
}
