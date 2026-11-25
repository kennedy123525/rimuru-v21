const axios = require("axios")
module.exports = {
  name: "ipinfo",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    const ip  = args[0]
    if (!ip) return sock.sendMessage(jid, { text: "Usage: .ipinfo <ip>\nExample: .ipinfo 8.8.8.8" })
    try {
      const r = await axios.get("https://ipapi.co/" + ip + "/json/", { timeout: 10000 })
      const d = r.data
      if (d.error) return sock.sendMessage(jid, { text: "❌ " + (d.reason || "Invalid IP") })
      sock.sendMessage(jid, {
        text: "🌐 *IP Information: " + ip + "*\n\n" +
              "📍 Country: " + (d.country_name || "N/A") + " " + (d.country_code || "") + "\n" +
              "🏙️ City: " + (d.city || "N/A") + "\n" +
              "🗺️ Region: " + (d.region || "N/A") + "\n" +
              "📮 Postal: " + (d.postal || "N/A") + "\n" +
              "⏰ Timezone: " + (d.timezone || "N/A") + "\n" +
              "🌐 ISP: " + (d.org || "N/A") + "\n" +
              "📡 ASN: " + (d.asn || "N/A") + "\n" +
              "🗺️ Coordinates: " + (d.latitude || "?") + ", " + (d.longitude || "?") + "\n" +
              "🔒 Type: " + (d.type || "Unknown")
      })
    } catch(e) { sock.sendMessage(jid, { text: "❌ IP lookup failed: " + e.message }) }
  }
}
