module.exports = {
  name: "opengroup",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid
    if (!jid.endsWith("@g.us")) return sock.sendMessage(jid, { text: "❌ Groups only!" })
    try {
      await sock.groupSettingUpdate(jid, "not_announcement")
      sock.sendMessage(jid, { text: "🔓 *Group is now OPEN*\nEveryone can send messages." })
    } catch (e) { sock.sendMessage(jid, { text: "❌ Need admin rights. " + e.message }) }
  }
}
