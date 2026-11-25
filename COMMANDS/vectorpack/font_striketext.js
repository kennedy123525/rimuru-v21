/**
 * .striketext — s̶t̶r̶i̶k̶e̶ text style
 */
module.exports = {
  name: "striketext",
  category: "unicode",
  description: "Convert text to striketext style",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    const text = args.join(" ").trim()
    if (!text) return sock.sendMessage(jid, { text: "🔤 Usage: .striketext <text>" }, { quoted: msg })
    const out = (t => t.split("").join("\u0336") + "\u0336")(text)
    await sock.sendMessage(jid, { text: out }, { quoted: msg })
  },
}
