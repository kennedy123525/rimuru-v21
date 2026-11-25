module.exports = {
  name: "resetwarn",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    if (!jid.endsWith("@g.us")) return sock.sendMessage(jid, { text: "❌ Groups only!" })
    const ctx = msg.message?.extendedTextMessage?.contextInfo
    const target = ctx?.participant || (args[0]?.replace(/[^0-9]/g,"")+"@s.whatsapp.net")
    if (!target || target === "@s.whatsapp.net") return sock.sendMessage(jid, { text: "Reply to someone or mention them to reset their warns." })
    global.warnCount[jid+"_"+target] = 0
    sock.sendMessage(jid, { text: "✅ Warnings reset for @" + target.split("@")[0], mentions: [target] })
  }
}
