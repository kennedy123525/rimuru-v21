module.exports = {
  name: "setdesc",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    if (!jid.endsWith("@g.us")) return sock.sendMessage(jid, { text: "❌ Groups only!" })
    const desc = args.join(" ")
    if (!desc) return sock.sendMessage(jid, { text: "Usage: .setdesc <new description>" })
    try {
      await sock.groupUpdateDescription(jid, desc)
      sock.sendMessage(jid, { text: `✅ Group description updated!` })
    } catch { sock.sendMessage(jid, { text: "❌ Need admin rights." }) }
  }
}
