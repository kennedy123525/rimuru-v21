/**
 * .gpt4 — GPT-4o class chat via multi-provider chain
 */
const ezapi = require("../../lib/ezapi")
module.exports = {
  name: "gpt4",
  category: "ai",
  description: "Ask GPT-4o anything",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    const q = args.join(" ").trim()
    if (!q) return sock.sendMessage(jid, { text: "🤖 Usage: .gpt4 <question>" }, { quoted: msg })
    await sock.sendMessage(jid, { react: { text: "🧠", key: msg.key } }).catch(() => {})
    const answer = await ezapi.tryChain([
      async () => {
        const d = await ezapi.getJSON("https://api.ryzendesu.vip/api/ai/gpt4o?text=" + encodeURIComponent(q))
        return typeof d === "string" ? d : (d?.answer || d?.result || d?.message || null)
      },
      async () => {
        const r = await ezapi.client.get("https://text.pollinations.ai/" + encodeURIComponent(q), { timeout: 25000 })
        return typeof r.data === "string" && r.data.length > 2 ? r.data : null
      },
      async () => {
        const d = await ezapi.getJSON("https://prexzyapis.com/ai/chatbot?text=" + encodeURIComponent(q))
        return d?.result || d?.response || d?.message || null
      },
    ], "gpt4")
    if (!answer) return sock.sendMessage(jid, { text: "❌ All AI providers are busy. Try again in a moment!" }, { quoted: msg })
    await sock.sendMessage(jid, { text: "🤖 *VECTOR 4o*\n\n❓ " + q + "\n\n💬 " + String(answer).slice(0, 3000) }, { quoted: msg })
  },
}
