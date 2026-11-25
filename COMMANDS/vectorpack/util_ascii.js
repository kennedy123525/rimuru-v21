/**
 * .ascii — text to ASCII codes
 */
module.exports = {
  name: "ascii",
  category: "utility",
  description: "Convert text to ASCII codes",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    const text = args.join(" ")
    if (!text) return sock.sendMessage(jid, { text: "🔢 Usage: .ascii <text>" }, { quoted: msg })
    const codes = text.split("").map(c => c.charCodeAt(0)).join(" ")
    await sock.sendMessage(jid, { text: "🔢 *ASCII CODES*\n\n" + codes.slice(0, 3000) }, { quoted: msg })
  },
}
