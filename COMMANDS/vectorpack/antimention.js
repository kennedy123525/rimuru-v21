const { isPaired } = require("../../lib/auth")
module.exports = {
  name: "antimention",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    if (!jid.endsWith("@g.us")) return sock.sendMessage(jid, { text: "❌ Groups only!" })
    if (!isPaired(sender)) return sock.sendMessage(jid, { text: "❌ Paired users only!" })
    if (!global.antiMention) global.antiMention = {}
    const action = (args[0]||"").toLowerCase()
    if (action === "on") { global.antiMention[jid] = true; if (global.saveState) global.saveState(); return sock.sendMessage(jid, { text: "✅ *Anti-Mention ON!* 📢\n\nAll mentions will be deleted.\n⚠️ Owner and paired users bypass this." }) }
    if (action === "off") { delete global.antiMention[jid]; if (global.saveState) global.saveState(); return sock.sendMessage(jid, { text: "❌ *Anti-Mention OFF.*" }) }
    sock.sendMessage(jid, { text: "📢 Anti-Mention: *" + (global.antiMention[jid] ? "ON 🟢" : "OFF 🔴") + "*\nUsage: .antimention on/off" })
  }
}
