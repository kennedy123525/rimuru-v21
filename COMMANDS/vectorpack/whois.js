const axios = require("axios")
module.exports = {
  name: "whois",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    const domain = args[0]
    if (!domain) return sock.sendMessage(jid, { text: "Usage: .whois <domain>\nExample: .whois google.com" })
    try {
      const r = await axios.get("https://api.whoapi.com/?domain=" + domain + "&r=whois", { timeout: 15000 }).catch(() => null)
      const r2 = await axios.get("https://rdap.org/domain/" + domain, { timeout: 15000 })
      const data = r2.data
      const reg = data?.events?.find(e => e.eventAction === "registration")?.eventDate?.slice(0, 10) || "N/A"
      const exp = data?.events?.find(e => e.eventAction === "expiration")?.eventDate?.slice(0, 10) || "N/A"
      const ns  = data?.nameservers?.map(n => n.ldhName).join(", ") || "N/A"
      const status = data?.status?.join(", ") || "N/A"
      await sock.sendMessage(jid, {
        text: "🔍 *WHOIS: " + domain + "*\n\n" +
              "📅 Registered: " + reg + "\n" +
              "⏳ Expires: " + exp + "\n" +
              "🖥️ Nameservers: " + ns + "\n" +
              "📊 Status: " + status
      })
    } catch(e) {
      sock.sendMessage(jid, { text: "❌ WHOIS lookup failed: " + e.message })
    }
  }
}
