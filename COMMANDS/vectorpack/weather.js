const axios = require("axios")
module.exports = {
  name: "weather",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    const city = args.join(" ")
    if (!city) return sock.sendMessage(jid, { text: "Usage: .weather <city>\nExample: .weather Lagos" })
    try {
      // Open-Meteo first (no key, reliable): geocode + forecast
      const g = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`, { timeout: 12000 })
      const loc = g.data?.results?.[0]
      if (!loc) throw new Error("city not found")
      const w = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${loc.latitude}&longitude=${loc.longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`, { timeout: 15000 })
      const c = w.data?.current
      if (!c) throw new Error("no data")
      const WMO = { 0:["Clear sky","🌙"],1:["Mainly clear","🌤️"],2:["Partly cloudy","⛅"],3:["Overcast","☁️"],45:["Fog","🌫️"],48:["Rime fog","🌫️"],51:["Light drizzle","🌦️"],53:["Drizzle","🌦️"],55:["Dense drizzle","🌧️"],61:["Light rain","🌧️"],63:["Rain","🌧️"],65:["Heavy rain","🌧️"],66:["Freezing rain","🌧️"],67:["Freezing rain","🌧️"],71:["Light snow","🌨️"],73:["Snow","❄️"],75:["Heavy snow","❄️"],77:["Snow grains","🌨️"],80:["Light showers","🌦️"],81:["Showers","🌧️"],82:["Heavy showers","⛈️"],85:["Snow showers","🌨️"],86:["Snow showers","❄️"],95:["Thunderstorm","⛈️"],96:["Thunderstorm + hail","⛈️"],99:["Thunderstorm + hail","⛈️"] }
      const pair = WMO[c.weather_code] || ["Weather","🌤️"]
      sock.sendMessage(jid, { text: `${pair[1]} *Weather in ${loc.name}${loc.country ? ", " + loc.country : ""}*\n\n🌡️ Temp: *${c.temperature_2m}°C* (feels ${c.apparent_temperature}°C)\n📝 ${pair[0]}\n💧 Humidity: ${c.relative_humidity_2m}%\n💨 Wind: ${c.wind_speed_10m} km/h` })
    } catch {
      // wttr.in fallback
      try {
        const r = await axios.get(`https://wttr.in/${encodeURIComponent(city)}?format=j1`, { timeout: 15000, headers: { "User-Agent": "curl/8.0" } })
        const c = r.data.current_condition[0]
        const a = r.data.nearest_area[0]
        const loc = a.areaName[0].value + ", " + a.country[0].value
        const icons = { Sunny:"☀️", Clear:"🌙", Cloudy:"☁️", Overcast:"☁️", Rain:"🌧️", Snow:"❄️", Fog:"🌫️", Thunder:"⛈️" }
        const desc = c.weatherDesc[0].value
        const icon = Object.keys(icons).find(k => desc.includes(k)) ? icons[Object.keys(icons).find(k => desc.includes(k))] : "🌤️"
        sock.sendMessage(jid, { text: `${icon} *Weather in ${loc}*\n\n🌡️ Temp: *${c.temp_C}°C* (feels ${c.FeelsLikeC}°C)\n📝 ${desc}\n💧 Humidity: ${c.humidity}%\n💨 Wind: ${c.windspeedKmph} km/h\n👁️ Visibility: ${c.visibility} km` })
      } catch {
        sock.sendMessage(jid, { text: `❌ City not found: "${city}"\nTry: .weather Lagos` })
      }
    }
  }
}
