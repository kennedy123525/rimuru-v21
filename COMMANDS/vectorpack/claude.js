const axios = require("axios")
if (!global.claudeSessions) global.claudeSessions = {}
module.exports = {
  name: "claude",
  async execute(sock, msg, args) {
    const jid   = msg.key.remoteJid
    const query = args.join(" ").trim()
    if (!query) return sock.sendMessage(jid, {
      text: "🤖 Usage: .claude <message>\nExample: .claude explain machine learning\n\n_Claude AI • Powered by VECTOR MD_"
    })
    await sock.sendMessage(jid, { text: "🤖 *Claude AI thinking...* ⏳" })
    try {
      const params = new URLSearchParams({ prompt: query })
      if (global.claudeSessions[jid]) params.set("sessionId", global.claudeSessions[jid])
      const r = await axios.get(
        "https://omegatech-api.dixonomega.tech/api/ai/Claude-pro?" + params.toString(),
        { timeout: 60000, headers: { "User-Agent": "Mozilla/5.0", "Accept": "application/json" } }
      )
      if (!r.data?.success && !r.data?.response) throw new Error(r.data?.message || "No response from Claude")
      if (r.data.sessionId) global.claudeSessions[jid] = r.data.sessionId
      const reply = (r.data.response || "No response").replace(/@Omegatech-01/g, "@CHAD_FDEV").replace(/Omegatech/g, "VECTOR MD")
      await sock.sendMessage(jid, { text: "🤖 *Claude AI*\n\n" + reply.slice(0, 3000) + "\n\n_Powered by VECTOR MD_" }, { quoted: msg })
    } catch(e) {
      // Try alternative endpoint
      try {
        const r2 = await axios.get("https://text.pollinations.ai/" + encodeURIComponent("You are Claude, a helpful AI assistant. " + query), { timeout:30000, headers:{"User-Agent":"Mozilla/5.0"} })
        if (r2.data && typeof r2.data === "string") {
          await sock.sendMessage(jid, { text: "🤖 *Claude AI*\n\n" + r2.data.trim().slice(0,3000) + "\n\n_Powered by VECTOR MD_" }, { quoted: msg })
        } else throw new Error("fallback failed")
      } catch { sock.sendMessage(jid, { text: "❌ Claude AI unavailable: " + e.message }) }
    }
  }
}
