/**
 * .readmore — hide part of your text behind "Read more"
 */
module.exports = {
  name: "readmore",
  category: "utility",
  description: "Split text with a read-more break",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    const text = args.join(" ")
    if (!text || !text.includes("|")) return sock.sendMessage(jid, { text: "📎 Usage: .readmore visible part | hidden part" }, { quoted: msg })
    const [vis, hid] = text.split("|")
    await sock.sendMessage(jid, { text: vis.trim() + "\n" + "଼".repeat(2000) + hid.trim() }, { quoted: msg })
  },
}
