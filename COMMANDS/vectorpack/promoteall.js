module.exports = {
  name: "promoteall",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    if (!jid.endsWith("@g.us")) return sock.sendMessage(jid, { text: "❌ Groups only!" })
    try {
      const meta = await sock.groupMetadata(jid)
      const toPromote = meta.participants.filter(p => !p.admin).map(p => p.id)
      if (!toPromote.length) return sock.sendMessage(jid, { text: "All members are already admins." })
      await sock.sendMessage(jid, { text: "⏳ Promoting " + toPromote.length + " members..." })
      for (const p of toPromote) await sock.groupParticipantsUpdate(jid, [p], "promote").catch(() => {})
      sock.sendMessage(jid, { text: "✅ Promoted " + toPromote.length + " members to admin!" })
    } catch (e) { sock.sendMessage(jid, { text: "❌ " + e.message }) }
  }
}
