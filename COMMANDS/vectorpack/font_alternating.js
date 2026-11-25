/**
 * .alternating — AlTeRnAtE text style
 */
module.exports = {
  name: "alternating",
  category: "unicode",
  description: "Convert text to alternating style",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    const text = args.join(" ").trim()
    if (!text) return sock.sendMessage(jid, { text: "🔤 Usage: .alternating <text>" }, { quoted: msg })
    const out = (t => t.split("").map((c, i) => i % 2 ? c.toUpperCase() : c.toLowerCase()).join(""))(text)
    await sock.sendMessage(jid, { text: out }, { quoted: msg })
  },
}
