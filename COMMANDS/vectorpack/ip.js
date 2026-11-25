const axios = require("axios")
module.exports = {
  name: "ip",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    const ip = args[0]
    if (!ip) return sock.sendMessage(jid, { text: "Usage: .ip <ip address>\nExample: .ip 8.8.8.8" })
    try {
      const r = await axios.get(`http://ip-api.com/json/${ip}`, { timeout: 10000 })
      const d = r.data
      if (d.status === "fail") return sock.sendMessage(jid, { text: "❌ Invalid IP address." })
      sock.sendMessage(jid, { text: `🌐 *IP Lookup: ${ip}*\n\n🌍 Country: ${d.country}\n🏙️ City: ${d.city}\n📍 Region: ${d.regionName}\n🌐 ISP: ${d.isp}\n🕐 Timezone: ${d.timezone}\n📍 Lat/Lon: ${d.lat}, ${d.lon}` })
    } catch { sock.sendMessage(jid, { text: "❌ IP lookup failed." }) }
  }
}
