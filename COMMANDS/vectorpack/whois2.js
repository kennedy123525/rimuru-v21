const axios = require("axios")
const { isPaired } = require("../../lib/auth")
module.exports = {
  name: "whois",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    if (!isPaired(sender)) return sock.sendMessage(jid, { text: "❌ Paired users only!" })
    const domain = args[0]
    if (!domain) return sock.sendMessage(jid, { text: "Usage: .whois <domain>\nExample: .whois google.com" })
    await sock.sendMessage(jid, { text: "🔍 Running WHOIS on: " + domain + "..." })
    try {
      const r = await axios.get("https://api.hackertarget.com/whois/?q=" + encodeURIComponent(domain), {timeout:20000})
      const data = r.data || "No data"
      await sock.sendMessage(jid, {
        text: "╔════════════════════════╗\n║  🔍 *WHOIS: " + domain.slice(0,20) + "*\n╚════════════════════════╝\n\n" +
              data.slice(0,2500) + "\n\n_Powered by VECTOR MD_"
      })
    } catch(e) { sock.sendMessage(jid, { text: "❌ WHOIS failed: " + e.message }) }
  }
}
