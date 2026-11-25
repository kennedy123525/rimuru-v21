/**
 * .carbontext — Carbon Fiber text effect (VECTOR MD textmaker engine)
 */
const engine = require("../../lib/textmaker")
const ezapi  = require("../../lib/ezapi")

module.exports = {
  name: "carbontext",
  category: "textmaker",
  description: "Generate a carbon fiber text image",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    const text = args.join(" ").trim()
    if (!text) return sock.sendMessage(jid, { text: "🖤 *Carbon Fiber Maker*\n\nSend: .carbontext <your text>\nExample: .carbontext VECTOR" }, { quoted: msg })
    if (text.length > 25) return sock.sendMessage(jid, { text: "❌ Keep it short (max 25 characters) for a clean render." }, { quoted: msg })
    await sock.sendMessage(jid, { react: { text: "⏳", key: msg.key } }).catch(() => {})
    try {
      const { url } = await engine.render("carbontext", text)
      const buf = await ezapi.downloadBuffer(url, { timeout: 60000 }).catch(() => null)
      if (buf) {
        await sock.sendMessage(jid, { image: buf, caption: "🖤 *Carbon Fiber effect*\n📝 " + text + "\n\n⚡ VECTOR MD Textmaker" }, { quoted: msg })
      } else {
        await sock.sendMessage(jid, { image: { url }, caption: "🖤 *Carbon Fiber effect*\n📝 " + text }, { quoted: msg })
      }
    } catch (e) {
      await sock.sendMessage(jid, { text: "❌ " + e.message }, { quoted: msg })
    }
  },
}
