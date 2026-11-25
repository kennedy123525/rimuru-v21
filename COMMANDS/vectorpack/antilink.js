const { isPaired, getNum } = require("../../lib/auth")
module.exports = {
  name: "antilink",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    if (!jid.endsWith("@g.us")) return sock.sendMessage(jid, { text: "❌ Groups only!" })
    if (!isPaired(sender)) return sock.sendMessage(jid, { text: "❌ Paired users only!" })
    if (!global.antiLink) global.antiLink = {}
    const action = (args[0]||"").toLowerCase()
    if (action === "on") {
      // Check if bot is admin - but still allow enabling if owner/paired is admin
      let botIsAdmin = false
      try {
        const meta = await sock.groupMetadata(jid)
        const botNum = getNum(sock.user?.id || "")
        const botMember = meta.participants.find(p => getNum(p.id) === botNum)
        botIsAdmin = !!botMember?.admin
      } catch {}
      if (!botIsAdmin) {
        // Still enable it but warn
        global.antiLink[jid] = true
        if (global.saveState) global.saveState()
        return sock.sendMessage(jid, { text: "✅ *Anti-Link ON!* 🔗\n\n⚠️ Note: Make me an *admin* so I can delete links!\n\nLinks will be detected but I need admin to delete them." })
      }
      global.antiLink[jid] = true
      if (global.saveState) global.saveState()
      return sock.sendMessage(jid, { text: "✅ *Anti-Link ON!* 🔗\n\nLinks will be deleted automatically." })
    }
    if (action === "off") { delete global.antiLink[jid]; if (global.saveState) global.saveState(); return sock.sendMessage(jid, { text: "❌ *Anti-Link OFF.*" }) }
    sock.sendMessage(jid, { text: "🔗 Anti-Link: *" + (global.antiLink[jid] ? "ON 🟢" : "OFF 🔴") + "*\n\nUsage: .antilink on/off\n\n⚠️ Bot must be admin to delete links." })
  }
}
