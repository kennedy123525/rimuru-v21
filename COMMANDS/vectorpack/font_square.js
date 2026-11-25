/**
 * .square — 🅂🅀🅄🄰🅁🅴 text style
 */
module.exports = {
  name: "square",
  category: "unicode",
  description: "Convert text to square style",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    const text = args.join(" ").trim()
    if (!text) return sock.sendMessage(jid, { text: "🔤 Usage: .square <text>" }, { quoted: msg })
    const out = (t => t.replace(/[A-Za-z]/g, c => {
      const i = c.toUpperCase().charCodeAt(0) - 65
      return i >= 0 && i < 26 ? String.fromCodePoint(0x1F130 + i) : c
    }))(text)
    await sock.sendMessage(jid, { text: out }, { quoted: msg })
  },
}
