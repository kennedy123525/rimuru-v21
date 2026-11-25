const axios = require("axios")
module.exports = {
  name: "netscan",
  async execute(sock, msg, args) {
    const jid  = msg.key.remoteJid
    const host = args[0]
    if (!host) return sock.sendMessage(jid, { text: "Usage: .netscan <domain/ip>\nExample: .netscan google.com" })
    try {
      await sock.sendMessage(jid, { text: "🔍 Scanning *" + host + "*..." })
      const [dnsR, ipR] = await Promise.allSettled([
        axios.get("https://dns.google/resolve?name=" + host + "&type=A", { timeout: 8000 }),
        axios.get("https://ipapi.co/" + host + "/json/", { timeout: 8000 })
      ])
      let result = "🔒 *Network Scan: " + host + "*\n\n"
      if (dnsR.status === "fulfilled") {
        const answers = dnsR.value.data?.Answer || []
        const ips = answers.filter(a => a.type === 1).map(a => a.data)
        result += "🌐 IP Addresses:\n" + (ips.length ? ips.map(i => "• " + i).join("\n") : "Not resolved") + "\n\n"
      }
      if (ipR.status === "fulfilled" && !ipR.value.data?.error) {
        const d = ipR.value.data
        result += "📍 Location: " + (d.city||"?") + ", " + (d.country_name||"?") + "\n"
        result += "🌐 ISP: " + (d.org||"Unknown") + "\n"
        result += "⏰ Timezone: " + (d.timezone||"Unknown")
      }
      sock.sendMessage(jid, { text: result })
    } catch(e) { sock.sendMessage(jid, { text: "❌ Scan failed: " + e.message }) }
  }
}
