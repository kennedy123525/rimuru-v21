const axios = require("axios")
const seasons = require("../../lib/seasons")
if (!global.vectorChats) global.vectorChats = {}
module.exports = {
  name: "vector",
  async execute(sock, msg, args) {
    const jid   = msg.key.remoteJid
    const query = args.join(" ").trim()
    if (!query) return sock.sendMessage(jid, {
      text: "🤖 Usage: .vector <message>\nExample: .vector wassup bro what you know about quantum physics"
    })
    // Build conversation history for persistence
    if (!global.vectorChats[jid]) global.vectorChats[jid] = []
    global.vectorChats[jid].push({ role: "user", content: query })
    // Keep last 10 messages
    if (global.vectorChats[jid].length > 10) global.vectorChats[jid] = global.vectorChats[jid].slice(-10)

    // Same GenZ human persona as the chatbot (season-aware)
    const systemPrompt = seasons.vectorSystemPrompt()
    const history = global.vectorChats[jid].map(m => m.role + ": " + m.content).join("\n")
    const fullPrompt = systemPrompt + "\n\nConversation so far:\n" + history + "\n\nReply as Vector:"

    let reply = null
    try {
      const r = await axios.get("https://text.pollinations.ai/" + encodeURIComponent(fullPrompt), {
        timeout: 30000, headers: { "User-Agent": "Mozilla/5.0" }
      })
      if (r.data && typeof r.data === "string" && r.data.trim().length > 1) reply = r.data.trim().slice(0, 2000)
    } catch {}
    if (!reply) {
      try {
        const r = await axios.get("https://prexzyapis.com/ai/chatbot?text=" + encodeURIComponent(fullPrompt), {
          timeout: 30000, headers: { "User-Agent": "Mozilla/5.0" }
        })
        const t = r.data?.result || r.data?.response || r.data?.message || (typeof r.data === "string" ? r.data : "")
        if (t && typeof t === "string" && t.trim().length > 1) reply = t.trim().slice(0, 2000)
      } catch {}
    }
    if (!reply) return sock.sendMessage(jid, { text: "❌ Vector glitched, try again in a sec" })
    global.vectorChats[jid].push({ role: "assistant", content: reply })
    await sock.sendMessage(jid, { text: reply }, { quoted: msg })
  }
}
