module.exports = {
  name: "who",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    const question = args.join(" ")
    if (!question) return sock.sendMessage(jid, { text: "Usage: .who <question>\nExample: .who is the most handsome in this group?" })
    if (!jid.endsWith("@g.us")) return sock.sendMessage(jid, { text: "❌ This command is for groups only!" })
    try {
      const meta = await sock.groupMetadata(jid)
      const members = meta.participants
      const chosen = members[Math.floor(Math.random()*members.length)]
      const num = chosen.id.split("@")[0]
      sock.sendMessage(jid, { text: "🎲 *Who " + question + "*\n\n👉 @" + num + " 🎉", mentions: [chosen.id] })
    } catch { sock.sendMessage(jid, { text: "❌ Only works in groups." }) }
  }
}
