const axios = require("axios")
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36"
module.exports = {
  name: "ttstalk",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    const username = (args[0]||"").replace("@","").trim()
    if (!username) return sock.sendMessage(jid, { text: "🕵️ Usage: .ttstalk <username>\nExample: .ttstalk khaby.lame" })
    await sock.sendMessage(jid, { text: "🕵️ Stalking @" + username + "..." })
    try {
      // CF bypass
      const cfRes = await axios.get("https://omegatech-api.dixonomega.tech/api/tools/cf-bypass", {
        params: { url:"https://www.anonymous-viewer.com", siteKey:"0x4AAAAAABNbm8zfrpvm5sRD", type:"turnstile-min" },
        headers: { "user-agent": UA }, timeout: 30000
      })
      if (!cfRes.data?.success) throw new Error("CF bypass failed")
      const token = cfRes.data.result?.token
      const { data } = await axios.get("https://www.anonymous-viewer.com/api/tiktok/display", {
        params: { username },
        headers: { "user-agent":UA, "accept":"*/*", "referer":"https://www.anonymous-viewer.com/tiktok/"+username, "x-turnstile-token":token },
        timeout: 30000
      })
      const info  = data.profile?.userInfo?.user
      const stats = data.profile?.userInfo?.stats
      const posts = data.posts?.originalItems || []
      if (!info) throw new Error("User not found")
      const result =
        "🕵️ *TikTok OSINT: @" + username + "*\n\n" +
        "👤 Name: *" + (info.nickname||"N/A") + "*\n" +
        "🆔 Username: @" + (info.uniqueId||username) + "\n" +
        "👥 Followers: *" + (stats?.followerCount||0).toLocaleString() + "*\n" +
        "❤️ Likes: *" + (stats?.heartCount||0).toLocaleString() + "*\n" +
        "🎬 Videos: *" + (stats?.videoCount||0).toLocaleString() + "*\n" +
        "📝 Bio: _" + (info.signature||"No bio") + "_\n\n" +
        "📌 *Latest Posts:*\n" +
        posts.slice(0,3).map((v,i) => (i+1)+". " + (v.desc||"No caption").slice(0,60) + "\n   👁 " + (v.stats?.playCount||0).toLocaleString() + " views").join("\n") + "\n\n" +
        "_Powered by VECTOR MD_"
      await sock.sendMessage(jid, { text: result })
    } catch(e) { sock.sendMessage(jid, { text: "❌ TikTok stalk failed: " + e.message }) }
  }
}
