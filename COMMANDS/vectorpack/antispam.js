const { isPaired } = require("../../lib/auth")
module.exports = {
  name: "antispam",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    if (!jid.endsWith("@g.us")) return sock.sendMessage(jid, { text: "❌ Groups only!" })
    if (!isPaired(sender)) return sock.sendMessage(jid, { text: "❌ Paired users only!" })
    if (!global.antiSpam) global.antiSpam = {}
    const action = (args[0]||"").toLowerCase()
    if (action === "on") { global.antiSpam[jid] = true; if (global.saveState) global.saveState(); return sock.sendMessage(jid, { text: "✅ *Anti-Spam ON!* 🚿\n\nMembers sending too many messages will be warned.\n⚠️ Owner and paired users bypass this." }) }
    if (action === "off") { delete global.antiSpam[jid]; if (global.saveState) global.saveState(); return sock.sendMessage(jid, { text: "❌ *Anti-Spam OFF.*" }) }
    sock.sendMessage(jid, { text: "🚿 Anti-Spam: *" + (global.antiSpam[jid] ? "ON 🟢" : "OFF 🔴") + "*\nUsage: .antispam on/off" })
  }
}
