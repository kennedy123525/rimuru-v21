const { isPaired } = require("../../lib/auth")
module.exports = {
  name: "autoreact",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    if (!isPaired(sender)) return sock.sendMessage(jid, { text: "❌ Paired users only!" })
    if (!global.autoReact) global.autoReact = {}
    const action = (args[0]||"").toLowerCase()
    if (action === "on") {
      global.autoReact[jid] = true
      return sock.sendMessage(jid, { text: "❤️ *Auto React ON!*\n\nBot will react to every message in this chat with a random emoji!" })
    }
    if (action === "off") {
      delete global.autoReact[jid]
      return sock.sendMessage(jid, { text: "❤️ *Auto React OFF.*" })
    }
    sock.sendMessage(jid, { text: "Usage: .autoreact on/off\nStatus: " + (global.autoReact?.[jid] ? "ON 🟢" : "OFF 🔴") })
  }
}
