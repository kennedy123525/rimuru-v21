const { isOwner } = require("../../lib/auth")
module.exports = {
  name: "private",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    if (!isOwner(sender)) return sock.sendMessage(jid, { text: "❌ Owner only!" })
    global.botMode = "private"
    if (global.saveState) global.saveState()
    await sock.sendMessage(jid, {
      text: "🔒 *Private Mode Activated!*\n\nNow only the owner can use the bot.\n👥 Everyone else is ignored (silent).\n\nUse *.public* to unlock it again."
    }, { quoted: msg })
  }
}
