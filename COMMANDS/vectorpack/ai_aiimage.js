/**
 * .aiimage — alias-style image gen with different seed
 */
const ezapi = require("../../lib/ezapi")
module.exports = {
  name: "aiimage",
  category: "ai",
  description: "Turn text into an AI artwork",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    const prompt = args.join(" ").trim()
    if (!prompt) return sock.sendMessage(jid, { text: "🖼️ Usage: .aiimage <description>" }, { quoted: msg })
    const style = ["digital art", "photorealistic", "watercolor painting", "anime style", "3D render"][Math.floor(Math.random() * 5)]
    const url = "https://image.pollinations.ai/prompt/" + encodeURIComponent(prompt + ", " + style) + "?width=1024&height=1024&nologo=true&seed=" + Math.floor(Math.random() * 99999)
    try {
      const buf = await ezapi.downloadBuffer(url, { timeout: 90000 })
      await sock.sendMessage(jid, { image: buf, caption: "🖼️ *" + style + "*\n📝 " + prompt }, { quoted: msg })
    } catch {
      try { await sock.sendMessage(jid, { image: { url }, caption: "🖼️ " + prompt }, { quoted: msg }) }
      catch { await sock.sendMessage(jid, { text: "❌ Engine busy, try again!" }, { quoted: msg }) }
    }
  },
}
