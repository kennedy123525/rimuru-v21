const axios = require("axios")
const { isPaired } = require("../../lib/auth")
module.exports = {
  name: "tracert",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    if (!isPaired(sender)) return sock.sendMessage(jid, { text: "❌ Paired users only!" })
    const host = args[0]
    if (!host) return sock.sendMessage(jid, { text: "Usage: .tracert <host>\nExample: .tracert google.com" })
    await sock.sendMessage(jid, { text: "📡 Tracing route to: " + host + "..." })
    try {
      const r = await axios.get("https://api.hackertarget.com/mtr/?q=" + encodeURIComponent(host), {timeout:30000})
      await sock.sendMessage(jid, {
        text: "╔════════════════════════╗\n║  📡 *TRACEROUTE: " + host.slice(0,15) + "*\n╚════════════════════════╝\n\n" +
              (r.data||"No data").slice(0,2000) + "\n\n_Powered by VECTOR MD_"
      })
    } catch(e) { sock.sendMessage(jid, { text: "❌ Tracert failed: " + e.message }) }
  }
}
