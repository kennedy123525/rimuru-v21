module.exports = {
  name: "resetlink",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid
    if (!jid.endsWith("@g.us")) return sock.sendMessage(jid, { text: "❌ Groups only!" })
    try {
      await sock.groupRevokeInvite(jid)
      const newLink = await sock.groupInviteCode(jid)
      sock.sendMessage(jid, { text: `✅ Group link reset!\n\nNew link: https://chat.whatsapp.com/${newLink}` })
    } catch { sock.sendMessage(jid, { text: "❌ Need admin rights." }) }
  }
}
