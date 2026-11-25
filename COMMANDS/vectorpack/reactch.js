const axios = require("axios")
const { isPaired } = require("../../lib/auth")
module.exports = {
  name: "reactch",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    if (!isPaired(sender)) return sock.sendMessage(jid, { text: "❌ Paired users only!" })
    const postLink = args[0]
    const emojis   = (args[1]||"❤️,🔥,😂,🎉").split(",").map(e=>e.trim()).filter(Boolean).slice(0,4)
    if (!postLink || !postLink.includes("whatsapp.com/channel/")) {
      return sock.sendMessage(jid, {
        text: "Usage: .reactch <channel_link> <emoji1,emoji2>\nExample: .reactch https://whatsapp.com/channel/xxx 🔥,❤️,😂\n\nReacts to all posts in the channel!"
      })
    }
    await sock.sendMessage(jid, { text: "⚡ Sending " + emojis.join("") + " reactions..." })
    try {
      const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NTZmMzhjOTllNGEzOTVlOWM0ZTc3NSIsImlhdCI6MTc3NjQ0ODg1OCwiZXhwIjoxNzc3MDUzNjU4fQ.JiKqtKv4cMDJYCi_Ua8LxFKrfciRXVV736mo_Rtq3U8"
      const http = axios.create({ headers: {"Content-Type":"application/json","Authorization":"Bearer "+JWT}, timeout:30000 })
      const cfRes = await axios.get("https://omegatech-api.dixonomega.tech/api/tools/cf-bypass", {
        params:{url:"https://asitha.top/channel-manager",siteKey:"6LemKk8sAAAAAH5PB3f1EspbMlXjtwv5C8tiMHSm",type:"recaptcha-v3"},timeout:30000
      })
      if (!cfRes.data?.success) throw new Error("CF bypass failed")
      const tempRes = await http.post("https://back.asitha.top/api/user/get-temp-token", { recaptcha_token: cfRes.data.result?.token })
      if (!tempRes.data?.token) throw new Error("No temp key")
      await http.post("https://back.asitha.top/api/channel/react-to-post?apiKey=" + tempRes.data.token, { post_link: postLink, reacts: emojis.join(",") })
      await sock.sendMessage(jid, { text: "✅ *Reactions sent!* " + emojis.join(" ") + "\n🔗 " + postLink + "\n\n_Powered by VECTOR MD_" })
    } catch(e) { sock.sendMessage(jid, { text: "❌ reactch failed: " + (e.response?.data?.message || e.message) }) }
  }
}
