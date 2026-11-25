const axios = require("axios")
module.exports = {
  name: "tracert",
  async execute(sock, msg, args) {
    const jid  = msg.key.remoteJid
    const host = args[0]
    if (!host) return sock.sendMessage(jid, { text: "Usage: .tracert <host>\nExample: .tracert google.com" })
    try {
      const r = await axios.get("https://api.hackertarget.com/traceroute/?q=" + host, { timeout: 30000 })
      const lines = r.data?.split("\n").slice(0, 15).join("\n") || "No data"
      sock.sendMessage(jid, { text: "🛣️ *Traceroute: " + host + "*\n\n```\n" + lines + "\n```" })
    } catch(e) {
      sock.sendMessage(jid, { text: "❌ Traceroute failed: " + e.message })
    }
  }
}
