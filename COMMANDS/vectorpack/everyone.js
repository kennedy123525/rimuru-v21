module.exports = {
  name: "everyone",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    if (!jid.endsWith("@g.us")) return sock.sendMessage(jid, { text: "❌ Groups only!" })
    try {
      const meta = await sock.groupMetadata(jid)
      const mentions = meta.participants.map(p=>p.id)
      const text = (args.join(" ") || "Everyone is needed here!") + "\n\n" + mentions.map(m=>"@"+m.split("@")[0]).join(" ")
      sock.sendMessage(jid, { text, mentions })
    } catch { sock.sendMessage(jid, { text: "❌ Failed." }) }
  }
}
