const axios = require("axios")
module.exports = {
  name: "rap",
  async execute(sock, msg, args) {
    const jid   = msg.key.remoteJid
    const topic = args.join(" ").trim() || "life, success, and the hustle"
    await sock.sendMessage(jid, { react: { text: "🎤", key: msg.key } })
    await sock.sendMessage(jid, { text: "🎤 Writing rap about: *" + topic + "*..." })
    try {
      const prompt = `Write a long fire rap song about: ${topic}

Structure it like this:
[Verse 1] - 8 bars
[Chorus] - 4 bars  
[Verse 2] - 8 bars
[Bridge] - 4 bars
[Outro] - 4 bars

Rules:
- Strong rhyme scheme (AABB or ABAB)
- Use metaphors, wordplay, real bars
- Street smart, authentic rap style
- Make it at least 28 lines total
- No asterisks or hashtags`

      const apis = [
        () => axios.get("https://text.pollinations.ai/" + encodeURIComponent(prompt), {timeout:40000, headers:{"User-Agent":"Mozilla/5.0"}}),
        () => axios.get("https://api.ownedapi.com/api/chat?message=" + encodeURIComponent(prompt), {timeout:30000}),
      ]
      let result = null
      for (const api of apis) {
        try { const r = await api(); if (r.data && typeof r.data === "string" && r.data.length > 100) { result = r.data; break } } catch {}
      }
      if (!result) throw new Error("AI failed to generate rap")
      await sock.sendMessage(jid, {
        text: "🎤 *RAP: " + topic.toUpperCase() + "*\n\n" + result.trim().slice(0,3500) + "\n\n_Powered by VECTOR MD_"
      })
      await sock.sendMessage(jid, { react: { text: "🔥", key: msg.key } })
    } catch(e) {
      await sock.sendMessage(jid, { react: { text: "❌", key: msg.key } })
      sock.sendMessage(jid, { text: "❌ Rap gen failed: " + e.message })
    }
  }
}
