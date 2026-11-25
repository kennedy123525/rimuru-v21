/**
 * .spaced — s p a c e text style
 */
module.exports = {
  name: "spaced",
  category: "unicode",
  description: "Convert text to spaced style",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    const text = args.join(" ").trim()
    if (!text) return sock.sendMessage(jid, { text: "🔤 Usage: .spaced <text>" }, { quoted: msg })
    const out = (t => t.split("").join(" "))(text)
    await sock.sendMessage(jid, { text: out }, { quoted: msg })
  },
}
