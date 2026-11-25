module.exports = {
  name: "linkgc",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid
    if (!jid.endsWith("@g.us")) return sock.sendMessage(jid, { text: "❌ Groups only!" })
    try {
      const code = await sock.groupInviteCode(jid)
      sock.sendMessage(jid, { text: "🔗 *Group Invite Link*\n\nhttps://chat.whatsapp.com/" + code })
    } catch { sock.sendMessage(jid, { text: "❌ Need admin rights to get invite link." }) }
  }
}
