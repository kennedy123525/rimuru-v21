/**
 * .titlecase — Title Case Every Word
 */
module.exports = {
  name: "titlecase",
  category: "utility",
  description: "Title Case your text",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    const text = args.join(" ")
    if (!text) return sock.sendMessage(jid, { text: "🔠 Usage: .titlecase <text>" }, { quoted: msg })
    await sock.sendMessage(jid, { text: text.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()) }, { quoted: msg })
  },
}
