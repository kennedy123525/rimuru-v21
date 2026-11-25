module.exports = {
  name: "time",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid
    const zones = [
      ["🇪🇸 Madrid (Bot)", "Europe/Madrid"],
      ["🇬🇧 London", "Europe/London"],
      ["🇺🇸 New York", "America/New_York"],
      ["🇳🇬 Lagos", "Africa/Lagos"],
      ["🇿🇦 Johannesburg", "Africa/Johannesburg"],
      ["🇦🇪 Dubai", "Asia/Dubai"],
      ["🇮🇳 Mumbai", "Asia/Kolkata"],
      ["🇨🇳 Beijing", "Asia/Shanghai"],
      ["🇯🇵 Tokyo", "Asia/Tokyo"],
      ["🇧🇷 São Paulo", "America/Sao_Paulo"],
    ]
    const lines = zones.map(([name, tz]) => {
      const t = new Intl.DateTimeFormat("en-GB", {
        timeZone: tz, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false
      }).format(new Date())
      return name + ": *" + t + "*"
    })
    sock.sendMessage(jid, { text: "🕐 *World Time*\n\n" + lines.join("\n") })
  }
}
