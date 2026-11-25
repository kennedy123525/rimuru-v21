/**
 * .imagine — AI image generation (pollinations)
 */
const ezapi = require("../../lib/ezapi")
module.exports = {
  name: "imagine",
  category: "ai",
  description: "Generate an AI image from text",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    const prompt = args.join(" ").trim()
    if (!prompt) return sock.sendMessage(jid, { text: "🎨 Usage: .imagine <description>\nExample: .imagine neon cyberpunk city at night" }, { quoted: msg })
    await sock.sendMessage(jid, { react: { text: "🎨", key: msg.key } }).catch(() => {})
    const url = "https://image.pollinations.ai/prompt/" + encodeURIComponent(prompt) + "?width=1024&height=1024&nologo=true&seed=" + Math.floor(Math.random() * 99999)
    try {
      const buf = await ezapi.downloadBuffer(url, { timeout: 90000 })
      await sock.sendMessage(jid, { image: buf, caption: "🎨 *VECTOR IMAGINE*\n📝 " + prompt }, { quoted: msg })
    } catch (e) {
      try {
        await sock.sendMessage(jid, { image: { url }, caption: "🎨 *VECTOR IMAGINE*\n📝 " + prompt }, { quoted: msg })
      } catch {
        await sock.sendMessage(jid, { text: "❌ Image engine busy — try again!" }, { quoted: msg })
      }
    }
  },
}
