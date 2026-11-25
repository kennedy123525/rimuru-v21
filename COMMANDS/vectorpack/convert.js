module.exports = {
  name: "convert",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    if (args.length < 3) return sock.sendMessage(jid, { text: "Usage: .convert <value> <from> <to>\nExamples:\n.convert 100 km miles\n.convert 30 celsius fahrenheit\n.convert 5 kg lbs\n.convert 1 meter feet" })
    const val = parseFloat(args[0]), from = args[1].toLowerCase(), to = args[2].toLowerCase()
    if (isNaN(val)) return sock.sendMessage(jid, { text: "❌ Invalid value." })
    const conversions = {
      "km-miles": v => v*0.621371, "miles-km": v => v/0.621371,
      "kg-lbs": v => v*2.20462, "lbs-kg": v => v/2.20462,
      "kg-grams": v => v*1000, "grams-kg": v => v/1000,
      "celsius-fahrenheit": v => v*9/5+32, "fahrenheit-celsius": v => (v-32)*5/9,
      "celsius-kelvin": v => v+273.15, "kelvin-celsius": v => v-273.15,
      "meter-feet": v => v*3.28084, "feet-meter": v => v/3.28084,
      "meter-cm": v => v*100, "cm-meter": v => v/100,
      "meter-inches": v => v*39.3701, "inches-meter": v => v/39.3701,
      "liter-gallon": v => v*0.264172, "gallon-liter": v => v/0.264172,
      "mb-gb": v => v/1024, "gb-mb": v => v*1024,
      "gb-tb": v => v/1024, "tb-gb": v => v*1024,
    }
    const key = from + "-" + to
    const fn = conversions[key]
    if (!fn) return sock.sendMessage(jid, { text: "❌ Conversion not supported.\nAvailable: km↔miles, kg↔lbs, celsius↔fahrenheit, meter↔feet, liter↔gallon, mb↔gb, gb↔tb" })
    const result = fn(val).toFixed(4)
    sock.sendMessage(jid, { text: "🔄 *Converter*\n\n" + val + " " + from + " = *" + result + " " + to + "*" })
  }
}
