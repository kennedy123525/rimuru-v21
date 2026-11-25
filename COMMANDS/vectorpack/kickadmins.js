module.exports = {
  name: "kickadmins",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    if (!jid.endsWith("@g.us")) return sock.sendMessage(jid, { text: "❌ Groups only!" })
    const config = require("../../lib/vconfig")
    if (sender !== config.ownerNumber + "@s.whatsapp.net") return sock.sendMessage(jid, { text: "❌ Owner only!" })
    try {
      const meta = await sock.groupMetadata(jid)
      const botJid = sock.user?.id?.replace(/:.*@/, "@")
      const admins = meta.participants.filter(p => p.admin && p.id !== botJid && p.id !== sender)
      if (!admins.length) return sock.sendMessage(jid, { text: "No admins to kick." })
      for (const a of admins) await sock.groupParticipantsUpdate(jid, [a.id], "remove").catch(() => {})
      sock.sendMessage(jid, { text: "✅ Kicked " + admins.length + " admin(s)." })
    } catch (e) { sock.sendMessage(jid, { text: "❌ " + e.message }) }
  }
}
