module.exports = {
  name: "kick",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    if (!jid.endsWith("@g.us")) return sock.sendMessage(jid, { text: "❌ Groups only!" })
    const ctx = msg.message?.extendedTextMessage?.contextInfo
    const target = ctx?.participant || (args[0]?.replace(/[^0-9]/g,"")+"@s.whatsapp.net")
    if (!target || target === "@s.whatsapp.net") return sock.sendMessage(jid, { text: "Reply to someone's message to kick them.\nOr: .kick <number>" })
    // Prevent kicking yourself
    if (target === sender) return sock.sendMessage(jid, { text: "❌ You can't kick yourself!\nUse *.leave* to exit the group yourself." })
    try {
      await sock.groupParticipantsUpdate(jid, [target], "remove")
      sock.sendMessage(jid, { text: "✅ @" + target.split("@")[0] + " has been kicked from the group! 👢", mentions: [target] })
    } catch (e) { sock.sendMessage(jid, { text: "❌ Could not kick. Make sure I'm an admin.\n" + e.message }) }
  }
}
