/**
 * .type — answer for typingtest
 */
module.exports = {
  name: "type",
  category: "games",
  description: "Answer for .typingtest",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    const loader = global.commandLoader
    const tt = loader ? loader.get("typingtest") : null
    if (tt) return tt.execute(sock, msg, args, sender, ctx)
    await sock.sendMessage(jid, { text: "Start a test first: .typingtest" }, { quoted: msg })
  },
}
