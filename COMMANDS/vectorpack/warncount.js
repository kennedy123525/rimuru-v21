module.exports = {
  name: "warncount",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    if (!jid.endsWith("@g.us")) return sock.sendMessage(jid, { text: "❌ Groups only!" })
    const ctx = msg.message?.extendedTextMessage?.contextInfo
    const target = ctx?.participant || (args[0]?.replace(/[^0-9]/g,"")+"@s.whatsapp.net")
    if (!target || target === "@s.whatsapp.net") return sock.sendMessage(jid, { text: "Reply to someone to check their warn count." })
    const count = global.warnCount[jid+"_"+target] || 0
    const bars = "🟥".repeat(count) + "⬜".repeat(5-count)
    sock.sendMessage(jid, { text: "📊 *Warn Count for @" + target.split("@")[0] + "*\n\n" + bars + "\n" + count + "/5 warnings", mentions: [target] })
  }
}
