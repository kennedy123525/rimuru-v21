const { isPaired, getNum } = require("../../lib/auth")
module.exports = {
  name: "tagall",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    if (!jid.endsWith("@g.us")) return sock.sendMessage(jid, { text: "❌ Groups only!" })
    if (!isPaired(sender)) return sock.sendMessage(jid, { text: "❌ Paired users only!" })
    try {
      const meta    = await sock.groupMetadata(jid)
      const members = meta.participants
      const message = args.join(" ") || "Attention everyone!"
      const mentions = members.map(p => p.id)
      const listText = members.map(p => "• @" + getNum(p.id)).join("\n")
      await sock.sendMessage(jid, {
        text: "╔═══════════════════╗\n" +
              "║  📢 *ATTENTION ALL*  ║\n" +
              "╚═══════════════════╝\n\n" +
              "💬 " + message + "\n\n" +
              "👥 *Members (" + members.length + "):*\n" +
              listText + "\n\n" +
              "_Powered by VECTOR MD_",
        mentions
      })
    } catch(e) { sock.sendMessage(jid, { text: "❌ Failed: " + e.message }) }
  }
}
