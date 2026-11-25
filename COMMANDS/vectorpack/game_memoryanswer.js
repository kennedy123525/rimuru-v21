/**
 * .memoryanswer — answer for memorygame
 */
module.exports = {
  name: "memoryanswer",
  category: "games",
  description: "Answer for .memorygame",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    const loader = global.commandLoader
    const mg = loader ? loader.get("memorygame") : null
    if (mg) return mg.execute(sock, msg, args, sender, ctx)
    await sock.sendMessage(jid, { text: "Start first: .memorygame" }, { quoted: msg })
  },
}
