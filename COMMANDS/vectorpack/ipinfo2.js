const axios = require("axios")
module.exports = {
  name: "ipinfo",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    const target = args[0]
    if (!target) return sock.sendMessage(jid, { text: "Usage: .ipinfo <ip>\nExample: .ipinfo 8.8.8.8" })
    await sock.sendMessage(jid, { text: "🌐 Fetching IP info for: " + target + "..." })
    try {
      const r = await axios.get("https://ipapi.co/" + target + "/json/", {
        timeout: 10000, headers: { "User-Agent": "Mozilla/5.0" }
      })
      const d = r.data
      if (d.error) throw new Error(d.reason || "Invalid IP")
      await sock.sendMessage(jid, {
        text: "╔════════════════════════╗\n║  🌐 *IP INFO: " + target + "*\n╚════════════════════════╝\n\n" +
              "📡 IP: *" + (d.ip||target) + "*\n" +
              "🌍 Country: *" + (d.country_name||"?") + "* " + (d.country_code||"") + "\n" +
              "🏙️ City: *" + (d.city||"?") + "*\n" +
              "🗺️ Region: *" + (d.region||"?") + "*\n" +
              "📮 Postal: *" + (d.postal||"?") + "*\n" +
              "🌐 ISP: *" + (d.org||"?") + "*\n" +
              "🏢 AS: *" + (d.asn||"?") + "*\n" +
              "🕐 Timezone: *" + (d.timezone||"?") + "*\n" +
              "📍 Lat/Lon: *" + (d.latitude||"?") + ", " + (d.longitude||"?") + "*\n" +
              "💱 Currency: *" + (d.currency_name||"?") + " (" + (d.currency||"?") + ")*\n" +
              "📞 Country Code: *+" + (d.country_calling_code||"?") + "*\n" +
              "🗣️ Languages: *" + (d.languages||"?").slice(0,30) + "*\n\n" +
              "_Powered by VECTOR MD_"
      })
    } catch(e) { sock.sendMessage(jid, { text: "❌ IP info failed: " + e.message }) }
  }
}
