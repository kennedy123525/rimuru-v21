const { isOwner } = require("../../lib/auth")
module.exports = {
  name: "public",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    if (!isOwner(sender)) return sock.sendMessage(jid, { text: "❌ Owner only!" })
    global.botMode = "public"
    if (global.saveState) global.saveState()
    await sock.sendMessage(jid, {
      text: "🌍 *Public Mode Activated!*\n\nEveryone in groups can use the bot again.\n📩 DMs remain owner/paired only.\n\nUse *.private* to lock it."
    }, { quoted: msg })
  }
}
