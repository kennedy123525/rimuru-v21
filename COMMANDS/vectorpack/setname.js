module.exports = {
  name: "setname",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    if (!jid.endsWith("@g.us")) return sock.sendMessage(jid, { text: "❌ Groups only!" })
    const name = args.join(" ")
    if (!name) return sock.sendMessage(jid, { text: "Usage: .setname <new group name>" })
    try {
      await sock.groupUpdateSubject(jid, name)
      sock.sendMessage(jid, { text: `✅ Group name changed to: *${name}*` })
    } catch { sock.sendMessage(jid, { text: "❌ Need admin rights." }) }
  }
}
