const { isPaired, getNum } = require("../../lib/auth")
module.exports = {
  name: "antitag",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    if (!jid.endsWith("@g.us")) return sock.sendMessage(jid, { text: "❌ Groups only!" })
    if (!isPaired(sender)) return sock.sendMessage(jid, { text: "❌ Paired users only!" })
    if (!global.antiTag) global.antiTag = {}
    const action = (args[0]||"").toLowerCase()
    if (action === "on") {
      global.antiTag[jid] = true; if (global.saveState) global.saveState()
      return sock.sendMessage(jid, { text: "✅ *Anti-Tag ON!* 🏷️\n\nMass tagging will be deleted.\n⚠️ Bot needs admin to delete messages." })
    }
    if (action === "off") { delete global.antiTag[jid]; if (global.saveState) global.saveState(); return sock.sendMessage(jid, { text: "❌ *Anti-Tag OFF.*" }) }
    sock.sendMessage(jid, { text: "🏷️ Anti-Tag: *" + (global.antiTag[jid] ? "ON 🟢" : "OFF 🔴") + "*\nUsage: .antitag on/off" })
  }
}
