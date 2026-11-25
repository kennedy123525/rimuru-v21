/**
 * .pixelglitch — Pixel Glitch text effect (VECTOR MD textmaker engine)
 */
const engine = require("../../lib/textmaker")
const ezapi  = require("../../lib/ezapi")

module.exports = {
  name: "pixelglitch",
  category: "textmaker",
  description: "Generate a pixel glitch text image",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    const text = args.join(" ").trim()
    if (!text) return sock.sendMessage(jid, { text: "🟪 *Pixel Glitch Maker*\n\nSend: .pixelglitch <your text>\nExample: .pixelglitch VECTOR" }, { quoted: msg })
    if (text.length > 25) return sock.sendMessage(jid, { text: "❌ Keep it short (max 25 characters) for a clean render." }, { quoted: msg })
    await sock.sendMessage(jid, { react: { text: "⏳", key: msg.key } }).catch(() => {})
    try {
      const { url } = await engine.render("pixelglitch", text)
      const buf = await ezapi.downloadBuffer(url, { timeout: 60000 }).catch(() => null)
      if (buf) {
        await sock.sendMessage(jid, { image: buf, caption: "🟪 *Pixel Glitch effect*\n📝 " + text + "\n\n⚡ VECTOR MD Textmaker" }, { quoted: msg })
      } else {
        await sock.sendMessage(jid, { image: { url }, caption: "🟪 *Pixel Glitch effect*\n📝 " + text }, { quoted: msg })
      }
    } catch (e) {
      await sock.sendMessage(jid, { text: "❌ " + e.message }, { quoted: msg })
    }
  },
}
