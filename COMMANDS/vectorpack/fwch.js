const axios = require("axios")
const { isPaired } = require("../../lib/auth")
module.exports = {
  name: "fwch",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    if (!isPaired(sender)) return sock.sendMessage(jid, { text: "❌ Paired users only!" })
    const link  = args[0]
    const count = Math.min(Math.max(parseInt(args[1])||100,1),5000)
    if (!link || !link.includes("whatsapp.com/channel/")) {
      return sock.sendMessage(jid, {
        text: "Usage: .fwch <channel_link> <amount>\nExample: .fwch https://whatsapp.com/channel/xxx 1000\n\nMax: 5000 followers\n\n⚠️ This uses third-party APIs"
      })
    }
    await sock.sendMessage(jid, { text: "👥 Adding " + count + " followers to channel...\n⏳ This may take a moment..." })
    try {
      const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NTZmMzhjOTllNGEzOTVlOWM0ZTc3NSIsImlhdCI6MTc3NjQ0ODg1OCwiZXhwIjoxNzc3MDUzNjU4fQ.JiKqtKv4cMDJYCi_Ua8LxFKrfciRXVV736mo_Rtq3U8"
      const http = axios.create({ headers:{"Content-Type":"application/json","Authorization":"Bearer "+JWT}, timeout:30000 })
      const cfRes = await axios.get("https://omegatech-api.dixonomega.tech/api/tools/cf-bypass", {
        params:{url:"https://asitha.top/channel-manager",siteKey:"6LemKk8sAAAAAH5PB3f1EspbMlXjtwv5C8tiMHSm",type:"recaptcha-v3"},timeout:30000
      })
      if (!cfRes.data?.success) throw new Error("CF bypass failed")
      const tempRes = await http.post("https://back.asitha.top/api/user/get-temp-token",{recaptcha_token:cfRes.data.result?.token})
      if (!tempRes.data?.token) throw new Error("No temp key")
      // Send followers request
      const res = await http.post("https://back.asitha.top/api/channel/add-followers?apiKey=" + tempRes.data.token, {
        channel_link: link, count
      })
      await sock.sendMessage(jid, {
        text: "✅ *" + count + " followers added!*\n\n🔗 Channel: " + link + "\n\n_Powered by VECTOR MD_"
      })
    } catch(e) {
      // Try alternative
      sock.sendMessage(jid, { text: "❌ Followers API failed: " + (e.response?.data?.message || e.message) + "\n\n💡 This feature depends on third-party API availability." })
    }
  }
}
