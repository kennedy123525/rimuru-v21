module.exports = {
  name: "warn",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    if (!jid.endsWith("@g.us")) return sock.sendMessage(jid, { text: "❌ Groups only!" })
    const ctx = msg.message?.extendedTextMessage?.contextInfo
    const target = ctx?.participant || (args[0]?.replace(/[^0-9]/g,"")+"@s.whatsapp.net")
    if (!target || target === "@s.whatsapp.net") return sock.sendMessage(jid, { text: "Reply to a message or mention someone to warn them.\nUsage: .warn or reply + .warn" })
    
    const key = jid + "_" + target
    if (!global.warnCount[key]) global.warnCount[key] = 0
    global.warnCount[key]++
    const count = global.warnCount[key]
    const MAX = 5
    
    if (count >= MAX) {
      global.warnCount[key] = 0
      try {
        await sock.groupParticipantsUpdate(jid, [target], "remove")
        await sock.sendMessage(jid, { text: "🚨 @" + target.split("@")[0] + " has been *kicked* after reaching " + MAX + "/" + MAX + " warnings!", mentions: [target] })
      } catch {
        sock.sendMessage(jid, { text: "⚠️ @" + target.split("@")[0] + " reached " + MAX + "/" + MAX + " warnings but I couldn't kick them. Make me admin first!", mentions: [target] })
      }
    } else {
      const bars = "🟥".repeat(count) + "⬜".repeat(MAX-count)
      sock.sendMessage(jid, { text: "⚠️ *Warning " + count + "/" + MAX + "*\n\n@" + target.split("@")[0] + " has been warned!\n\n" + bars + "\n\n" + (MAX-count) + " warnings until kick.", mentions: [target] })
    }
  }
}
