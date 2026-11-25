module.exports = {
  name: "timezone",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    const zones = {
      "WAT": "Africa/Lagos", "GMT": "GMT", "UTC": "UTC",
      "EST": "America/New_York", "CST": "America/Chicago", "PST": "America/Los_Angeles",
      "BST": "Europe/London", "CET": "Europe/Paris", "IST": "Asia/Kolkata",
      "JST": "Asia/Tokyo", "CST_CHINA": "Asia/Shanghai", "AEST": "Australia/Sydney",
    }
    if (!args[0]) {
      const list = Object.keys(zones).join(", ")
      return sock.sendMessage(jid, { text: "🌍 *Time Zones*\n\nUsage: .timezone <zone>\nExample: .timezone WAT\n\nAvailable: " + list })
    }
    const tz = zones[args[0].toUpperCase()] || args[0]
    try {
      const now = new Date()
      const str = now.toLocaleString("en-US", { timeZone: tz, weekday:"short", year:"numeric", month:"short", day:"numeric", hour:"2-digit", minute:"2-digit", second:"2-digit" })
      sock.sendMessage(jid, { text: "🕐 *Time in " + args[0].toUpperCase() + "*\n\n" + str })
    } catch { sock.sendMessage(jid, { text: "❌ Invalid timezone: " + args[0] + "\nExample: .timezone Africa/Lagos" }) }
  }
}
