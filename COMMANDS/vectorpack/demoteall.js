module.exports = {
  name: "demoteall",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    if (!jid.endsWith("@g.us")) return sock.sendMessage(jid, { text: "❌ Groups only!" })
    try {
      const meta = await sock.groupMetadata(jid)
      const botJid = sock.user?.id?.replace(/:.*@/, "@")
      const toDemote = meta.participants.filter(p => p.admin && p.id !== botJid && p.id !== sender)
      if (!toDemote.length) return sock.sendMessage(jid, { text: "No admins to demote." })
      for (const p of toDemote) await sock.groupParticipantsUpdate(jid, [p.id], "demote").catch(() => {})
      sock.sendMessage(jid, { text: "✅ Demoted " + toDemote.length + " admins." })
    } catch (e) { sock.sendMessage(jid, { text: "❌ " + e.message }) }
  }
}
