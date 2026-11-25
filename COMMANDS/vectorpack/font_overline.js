/**
 * .overline — o̅v̅e̅r̅ text style
 */
module.exports = {
  name: "overline",
  category: "unicode",
  description: "Convert text to overline style",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    const text = args.join(" ").trim()
    if (!text) return sock.sendMessage(jid, { text: "🔤 Usage: .overline <text>" }, { quoted: msg })
    const out = (t => t.split("").join("\u0305") + "\u0305")(text)
    await sock.sendMessage(jid, { text: out }, { quoted: msg })
  },
}
