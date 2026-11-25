module.exports = {
  name: "tag",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    if (!jid.endsWith("@g.us")) return sock.sendMessage(jid, { text: "❌ Groups only!" })
    const quoted = msg.message?.extendedTextMessage?.contextInfo
    if (!quoted) return sock.sendMessage(jid, { text: "Reply to someone's message with .tag" })
    const target = quoted.participant
    const text = args.join(" ") || "You've been tagged!"
    sock.sendMessage(jid, { text: `📌 @${target.split("@")[0]}\n${text}`, mentions: [target] })
  }
}
