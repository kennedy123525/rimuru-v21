/**
 * .upper — SHOUT YOUR TEXT
 */
module.exports = {
  name: "upper",
  category: "utility",
  description: "Convert text to UPPERCASE",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    const text = args.join(" ")
    if (!text) return sock.sendMessage(jid, { text: "📢 Usage: .upper <text>" }, { quoted: msg })
    await sock.sendMessage(jid, { text: text.toUpperCase() }, { quoted: msg })
  },
}
