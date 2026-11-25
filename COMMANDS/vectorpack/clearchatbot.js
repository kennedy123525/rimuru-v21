const { isPaired } = require("../../lib/auth")
module.exports = {
  name: "clearchatbot",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    if (!isPaired(sender)) return sock.sendMessage(jid, { text: "❌ Paired users only!" })
    if (!global.chatHistory) global.chatHistory = {}
    if (!global.vectorChats) global.vectorChats = {}
    // Clear chatbot memories for this chat
    const cleared1 = !!global.chatHistory[jid]
    const cleared2 = !!global.vectorChats[jid]
    delete global.chatHistory[jid]
    delete global.vectorChats[jid]
    sock.sendMessage(jid, {
      text: "🧹 *Chatbot memory cleared!*\n\n" +
            (cleared1 || cleared2 ? "✅ Chat history erased" : "ℹ️ No history to clear") +
            "\n\nThe chatbot will start fresh in this chat.\n_Powered by VECTOR MD_"
    })
  }
}
