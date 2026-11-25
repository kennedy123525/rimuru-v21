module.exports = {
  name: "closegroup",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid
    if (!jid.endsWith("@g.us")) return sock.sendMessage(jid, { text: "❌ Groups only!" })
    try {
      await sock.groupSettingUpdate(jid, "announcement")
      sock.sendMessage(jid, { text: "🔒 *Group is now CLOSED*\nOnly admins can send messages." })
    } catch (e) { sock.sendMessage(jid, { text: "❌ Need admin rights. " + e.message }) }
  }
}
