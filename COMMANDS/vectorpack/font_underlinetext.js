/**
 * .underlinetext — u̲n̲d̲e̲r̲ text style
 */
module.exports = {
  name: "underlinetext",
  category: "unicode",
  description: "Convert text to underlinetext style",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    const text = args.join(" ").trim()
    if (!text) return sock.sendMessage(jid, { text: "🔤 Usage: .underlinetext <text>" }, { quoted: msg })
    const out = (t => t.split("").join("\u0332") + "\u0332")(text)
    await sock.sendMessage(jid, { text: out }, { quoted: msg })
  },
}
