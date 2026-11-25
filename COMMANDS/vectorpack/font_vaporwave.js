/**
 * .vaporwave — ｖａｐｏｒ text style
 */
module.exports = {
  name: "vaporwave",
  category: "unicode",
  description: "Convert text to vaporwave style",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    const text = args.join(" ").trim()
    if (!text) return sock.sendMessage(jid, { text: "🔤 Usage: .vaporwave <text>" }, { quoted: msg })
    const out = (t => t.replace(/[A-Za-z0-9 ]/g, c => c === " " ? "　" : String.fromCodePoint(c.charCodeAt(0) + 0xFEE0)))(text)
    await sock.sendMessage(jid, { text: out }, { quoted: msg })
  },
}
