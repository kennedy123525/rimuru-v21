module.exports = {
  name: "react",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    const emoji = args[0] || "❤️"
    const ctx = msg.message?.extendedTextMessage?.contextInfo
    
    // React to the quoted message if replying to one
    const targetKey = ctx 
      ? { remoteJid: jid, fromMe: ctx.participant === undefined, id: ctx.stanzaId, participant: ctx.participant }
      : msg.key
    
    try {
      await sock.sendMessage(jid, { react: { text: emoji, key: targetKey } })
    } catch (e) {
      sock.sendMessage(jid, { text: "❌ Reaction failed. Reply to a message and use: .react ❤️" })
    }
  }
}
