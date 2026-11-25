/**
 * .gemini — Gemini-style smart answers via provider chain
 */
const ezapi = require("../../lib/ezapi")
module.exports = {
  name: "gemini",
  category: "ai",
  description: "Ask Gemini-class AI",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    const q = args.join(" ").trim()
    if (!q) return sock.sendMessage(jid, { text: "✨ Usage: .gemini <question>" }, { quoted: msg })
    const answer = await ezapi.tryChain([
      async () => { const d = await ezapi.getJSON("https://api.ryzendesu.vip/api/ai/gemini?text=" + encodeURIComponent(q)); return d?.answer || d?.result || (typeof d === "string" ? d : null) },
      async () => { const r = await ezapi.client.get("https://text.pollinations.ai/" + encodeURIComponent("Answer in detail: " + q), { timeout: 25000 }); return typeof r.data === "string" && r.data.length > 2 ? r.data : null },
    ], "gemini")
    if (!answer) return sock.sendMessage(jid, { text: "❌ AI is napping. Try again shortly!" }, { quoted: msg })
    await sock.sendMessage(jid, { text: "✨ *VECTOR GEMINI*\n\n❓ " + q + "\n\n💬 " + String(answer).slice(0, 3000) }, { quoted: msg })
  },
}
