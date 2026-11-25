const axios = require("axios")
module.exports = {
  name: "phoneinfo",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    const num = (args[0] || "").replace(/\D/g, "")
    if (!num || num.length < 7) return sock.sendMessage(jid, {
      text: "Usage: .phoneinfo <number>\nExample: .phoneinfo 2348012345678"
    })
    await sock.sendMessage(jid, { text: "🔍 Looking up +" + num + "..." })
    try {
      const codes = {"1":"🇺🇸 USA/Canada","7":"🇷🇺 Russia","20":"🇪🇬 Egypt","27":"🇿🇦 South Africa","30":"🇬🇷 Greece","31":"🇳🇱 Netherlands","32":"🇧🇪 Belgium","33":"🇫🇷 France","34":"🇪🇸 Spain","36":"🇭🇺 Hungary","39":"🇮🇹 Italy","40":"🇷🇴 Romania","44":"🇬🇧 UK","49":"🇩🇪 Germany","51":"🇵🇪 Peru","52":"🇲🇽 Mexico","54":"🇦🇷 Argentina","55":"🇧🇷 Brazil","57":"🇨🇴 Colombia","60":"🇲🇾 Malaysia","61":"🇦🇺 Australia","62":"🇮🇩 Indonesia","63":"🇵🇭 Philippines","65":"🇸🇬 Singapore","66":"🇹🇭 Thailand","81":"🇯🇵 Japan","82":"🇰🇷 South Korea","86":"🇨🇳 China","90":"🇹🇷 Turkey","91":"🇮🇳 India","92":"🇵🇰 Pakistan","98":"🇮🇷 Iran","212":"🇲🇦 Morocco","213":"🇩🇿 Algeria","216":"🇹🇳 Tunisia","218":"🇱🇾 Libya","220":"🇬🇲 Gambia","221":"🇸🇳 Senegal","223":"🇲🇱 Mali","224":"🇬🇳 Guinea","225":"🇨🇮 Ivory Coast","226":"🇧🇫 Burkina Faso","227":"🇳🇪 Niger","228":"🇹🇬 Togo","229":"🇧🇯 Benin","231":"🇱🇷 Liberia","232":"🇸🇱 Sierra Leone","233":"🇬🇭 Ghana","234":"🇳🇬 Nigeria","235":"🇹🇩 Chad","237":"🇨🇲 Cameroon","243":"🇨🇩 DR Congo","244":"🇦🇴 Angola","250":"🇷🇼 Rwanda","251":"🇪🇹 Ethiopia","254":"🇰🇪 Kenya","255":"🇹🇿 Tanzania","256":"🇺🇬 Uganda","260":"🇿🇲 Zambia","263":"🇿🇼 Zimbabwe","264":"🇳🇦 Namibia","971":"🇦🇪 UAE","966":"🇸🇦 Saudi Arabia","974":"🇶🇦 Qatar"}
      let country = "🌍 Unknown"
      for (const [code, name] of Object.entries(codes).sort((a,b)=>b[0].length-a[0].length))
        if (num.startsWith(code)) { country = name; break }
      const isValid = num.length >= 10 && num.length <= 15
      const waJid = num + "@s.whatsapp.net"
      let waStatus = "Unknown"
      try {
        const result = await sock.onWhatsApp(waJid)
        waStatus = result?.[0]?.exists ? "✅ Registered on WhatsApp" : "❌ Not on WhatsApp"
      } catch {}
      await sock.sendMessage(jid, {
        text: "🕵️ *Phone OSINT: +" + num + "*\n\n" +
              "📞 Number: +" + num + "\n" +
              "🌍 Country: " + country + "\n" +
              "📏 Length: " + num.length + " digits\n" +
              "✅ Valid format: " + (isValid ? "Yes" : "No") + "\n" +
              "📱 " + waStatus + "\n\n" +
              "⚠️ _Educational purposes only_"
      })
    } catch(e) { sock.sendMessage(jid, { text: "❌ Failed: " + e.message }) }
  }
}
