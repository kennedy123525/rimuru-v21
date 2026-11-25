/**
 * .lower — calm your text down
 */
module.exports = {
  name: "lower",
  category: "utility",
  description: "Convert text to lowercase",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    const text = args.join(" ")
    if (!text) return sock.sendMessage(jid, { text: "🤫 Usage: .lower <text>" }, { quoted: msg })
    await sock.sendMessage(jid, { text: text.toLowerCase() }, { quoted: msg })
  },
}
