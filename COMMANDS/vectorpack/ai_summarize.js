/**
 * .summarize — condense any long text
 */
const ezapi = require("../../lib/ezapi")
module.exports = {
  name: "summarize",
  category: "ai",
  description: "Summarize long text with AI",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    const quotedText = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage?.conversation
    const text = args.join(" ") || quotedText || ""
    if (!text || text.length < 40) return sock.sendMessage(jid, { text: "📝 Send text to summarize:\n.summarize <long text>\nor reply to a message with .summarize" }, { quoted: msg })
    const q = "Summarize this in 3 short bullet points:\n\n" + text.slice(0, 4000)
    const answer = await ezapi.tryChain([
      async () => { const r = await ezapi.client.get("https://text.pollinations.ai/" + encodeURIComponent(q), { timeout: 30000 }); return typeof r.data === "string" && r.data.length > 2 ? r.data : null },
      async () => { const d = await ezapi.getJSON("https://api.ryzendesu.vip/api/ai/gpt4o?text=" + encodeURIComponent(q)); return d?.answer || d?.result || null },
    ], "summarize")
    if (!answer) return sock.sendMessage(jid, { text: "❌ Summarizer is busy!" }, { quoted: msg })
    await sock.sendMessage(jid, { text: "📝 *SUMMARY*\n\n" + String(answer).slice(0, 2500) }, { quoted: msg })
  },
}
