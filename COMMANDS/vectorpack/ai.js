const axios = require("axios")
const seasons = require("../../lib/seasons")
module.exports = {
  name: "ai",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    const prompt = args.join(" ")
    if (!prompt) return sock.sendMessage(jid, { text: "Usage: .ai <question>\nExample: .ai What is a noun?" })
    await sock.sendMessage(jid, { text: "🤖 *VECTOR MD AI*\n\n_Thinking..._" })
    // Season flavor (christmas, halloween...) appended when a season is active
    const finalPrompt = prompt + seasons.aiPersonaSuffix()
    const apis = [
      async () => {
        const r = await axios.get("https://text.pollinations.ai/" + encodeURIComponent(finalPrompt), { timeout: 30000, headers: { "User-Agent": "Mozilla/5.0" } })
        if (typeof r.data === "string" && r.data.length > 2) return r.data.trim()
        return null
      },
      async () => {
        const r = await axios.get("https://prexzyapis.com/ai/chatbot?text=" + encodeURIComponent(finalPrompt), { timeout: 30000, headers: { "User-Agent": "Mozilla/5.0" } })
        const t = r.data?.result || r.data?.response || r.data?.message || (typeof r.data === "string" ? r.data : "")
        return t && t.length > 2 ? t.trim() : null
      },
      async () => {
        const r = await axios.post("https://nexra.aryahcr.cc/api/chat/gpt", { messages: [{ role: "user", content: prompt }], model: "gpt-3.5-turbo", markdown: false }, { timeout: 30000 })
        return r.data?.gpt || r.data?.message || null
      },
      async () => {
        const r = await axios.get("https://api.siputzx.my.id/api/ai/chatgpt-3?content=" + encodeURIComponent(prompt), { timeout: 25000 })
        return r.data?.data || r.data?.result || null
      },
      async () => {
        const r = await axios.get("https://api.giftedtech.web.id/api/ai/gpt4?apikey=gifted&query=" + encodeURIComponent(prompt), { timeout: 25000 })
        return r.data?.result || r.data?.message || null
      },
      async () => {
        const r = await axios.get("https://api.ryzendesu.vip/api/ai/chatgpt?text=" + encodeURIComponent(prompt), { timeout: 25000 })
        return r.data?.answer || r.data?.response || r.data?.text || null
      },
    ]
    for (const fn of apis) {
      try {
        const reply = await fn()
        if (reply && typeof reply === "string" && reply.trim().length > 2) {
          return sock.sendMessage(jid, { text: "🤖 *VECTOR MD AI*\n\n" + reply.trim() })
        }
      } catch (_) {}
    }
    sock.sendMessage(jid, { text: "❌ AI is temporarily unavailable. Try again in a moment." })
  }
}
