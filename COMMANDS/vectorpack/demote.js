module.exports = {
  name: "demote",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    if (!jid.endsWith("@g.us")) return sock.sendMessage(jid, { text: "❌ Groups only!" })
    const ctx = msg.message?.extendedTextMessage?.contextInfo
    const target = ctx?.participant || (args[0]?.replace(/[^0-9]/g,"")+"@s.whatsapp.net")
    if (!target || target === "@s.whatsapp.net") return sock.sendMessage(jid, { text: "Reply to someone's message to demote them." })
    try {
      await sock.groupParticipantsUpdate(jid, [target], "demote")
      sock.sendMessage(jid, { text: "⬇️ @" + target.split("@")[0] + " has been demoted from admin.", mentions: [target] })
    } catch { sock.sendMessage(jid, { text: "❌ Couldn't demote. Make sure I'm an admin." }) }
  }
}
