const axios = require("axios")
module.exports = {
  name: "forecast",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    const city = args.join(" ")
    if (!city) return sock.sendMessage(jid, { text: "Usage: .forecast <city>\nExample: .forecast Lagos" })
    try {
      const r = await axios.get("https://wttr.in/" + encodeURIComponent(city) + "?format=j1", { timeout: 15000 })
      const days = r.data.weather.slice(0,3)
      let text = "🌤️ *3-Day Forecast: " + city + "*\n\n"
      days.forEach((day, i) => {
        const label = i===0?"Today":i===1?"Tomorrow":"Day 3"
        const maxC = day.maxtempC, minC = day.mintempC
        const desc = day.hourly[4]?.weatherDesc[0]?.value || "N/A"
        text += label + ": " + desc + " | " + minC + "°C - " + maxC + "°C\n"
      })
      sock.sendMessage(jid, { text })
    } catch { sock.sendMessage(jid, { text: "❌ Forecast unavailable for: " + city }) }
  }
}
