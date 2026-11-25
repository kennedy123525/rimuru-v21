const axios = require("axios")
module.exports = {
  name: "igstalk",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    const username = (args[0]||"").replace("@","").trim()
    if (!username) return sock.sendMessage(jid, { text: "🕵️ Usage: .igstalk <username>\nExample: .igstalk cristiano" })
    await sock.sendMessage(jid, { text: "🕵️ Stalking @" + username + " on Instagram..." })
    let name, bio, followers, following, posts, pic, verified, isPrivate
    let success = false
    const apis = [
      // API 1: Ryzendesu
      async () => {
        const r = await axios.get("https://api.ryzendesu.vip/api/stalker/ig?username=" + username, {timeout:15000})
        const u = r.data?.data || r.data
        if (!u?.username && !u?.full_name) throw new Error("no user")
        name=u.full_name||username; bio=u.biography||u.bio||""; followers=u.follower_count||u.followers||0
        following=u.following_count||u.following||0; posts=u.media_count||u.posts||0
        pic=u.profile_pic_url_hd||u.profile_pic_url; verified=u.is_verified; isPrivate=u.is_private
        return true
      },
      // API 2: Paxsenix
      async () => {
        const r = await axios.get("https://api.paxsenix.biz.id/ig/profile?username=" + username, {timeout:15000})
        const u = r.data?.result || r.data?.data || r.data
        if (!u) throw new Error("no data")
        name=u.full_name||u.fullName||u.name||username; bio=u.biography||u.bio||""
        followers=u.follower_count||u.followers||u.edge_followed_by?.count||0
        following=u.following_count||u.following||u.edge_follow?.count||0
        posts=u.media_count||u.posts||u.edge_owner_to_timeline_media?.count||0
        pic=u.profile_pic_url_hd||u.profile_pic_url||u.avatar; verified=u.is_verified; isPrivate=u.is_private
        return true
      },
      // API 3: Siputzx
      async () => {
        const r = await axios.get("https://api.siputzx.my.id/api/s/instagram?username=" + username, {timeout:15000})
        const u = r.data?.data || r.data
        if (!u) throw new Error("no data")
        name=u.full_name||username; bio=u.biography||""
        followers=u.follower_count||0; following=u.following_count||0; posts=u.media_count||0
        pic=u.profile_pic_url; verified=u.is_verified; isPrivate=u.is_private
        return true
      },
      // API 4: OG Tags scrape
      async () => {
        const r = await axios.get("https://www.instagram.com/" + username + "/", {
          timeout:15000,
          headers:{"User-Agent":"Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)","Accept":"text/html"}
        })
        const html = r.data
        const ogTitle   = html.match(/<meta property="og:title" content="([^"]+)"/)?.[1] || ""
        const ogDesc    = html.match(/<meta property="og:description" content="([^"]+)"/)?.[1] || ""
        const ogImg     = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1] || ""
        if (!ogTitle) throw new Error("blocked")
        name = ogTitle.split("(")[0].trim() || username
        // Parse description: "X Followers, Y Following, Z Posts"
        const fMatch = ogDesc.match(/([\d,KM.]+)\s+Followers?/i)
        const fgMatch = ogDesc.match(/([\d,KM.]+)\s+Following/i)
        const pMatch = ogDesc.match(/([\d,KM.]+)\s+Posts?/i)
        followers = fMatch?.[1]||"?"; following = fgMatch?.[1]||"?"; posts = pMatch?.[1]||"?"
        bio = ogDesc.split(" - See Instagram")[0] || ""
        pic = ogImg; verified = ogTitle.includes("✓"); isPrivate = false
        return true
      }
    ]
    for (const api of apis) {
      try { success = await api(); if (success) break } catch {}
    }
    const text =
      "🕵️ *Instagram OSINT: @" + username + "*\n\n" +
      "👤 Name: *" + (name||username) + "*" + (verified ? " ✅" : "") + "\n" +
      "🔒 Private: " + (isPrivate ? "Yes 🔐" : "No 🔓") + "\n" +
      "👥 Followers: *" + (typeof followers === "number" ? followers.toLocaleString() : followers||"?") + "*\n" +
      "➡️ Following: *" + (typeof following === "number" ? following.toLocaleString() : following||"?") + "*\n" +
      "📸 Posts: *" + (posts||"?") + "*\n" +
      (bio ? "📝 Bio: _" + String(bio).slice(0,150) + "_\n" : "") + "\n" +
      "🔗 https://instagram.com/" + username + "\n\n" +
      "_Powered by VECTOR MD_"
    if (!success) return sock.sendMessage(jid, { text: "❌ Instagram stalk failed. Account may be private.\n\n" + text })
    if (pic) {
      try {
        const imgRes = await axios.get(pic, { responseType:"arraybuffer", timeout:10000, headers:{"User-Agent":"Mozilla/5.0"} })
        await sock.sendMessage(jid, { image: Buffer.from(imgRes.data), caption: text })
        return
      } catch {}
    }
    sock.sendMessage(jid, { text })
  }
}
