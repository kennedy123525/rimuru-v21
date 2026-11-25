module.exports = {
  name: "checkadmin",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    if (!jid.endsWith("@g.us")) return sock.sendMessage(jid, { text: "❌ Groups only!" })
    try {
      const meta = await sock.groupMetadata(jid)
      const botJid = sock.user?.id?.replace(/:.*@/, "@")
      const isAdmin = meta.participants.find(p => p.id === botJid)?.admin
      const senderAdmin = meta.participants.find(p => p.id === sender)?.admin
      sock.sendMessage(jid, { text: "🛡️ *Admin Check*\n\nBot admin: " + (isAdmin ? "✅ Yes" : "❌ No") + "\nYou admin: " + (senderAdmin ? "✅ Yes" : "❌ No") })
    } catch { sock.sendMessage(jid, { text: "❌ Failed." }) }
  }
}
