const { isPaired } = require("../../lib/auth")
module.exports = {
  name: "chatbot",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    if (!isPaired(sender)) return sock.sendMessage(jid, { text: "❌ Paired users only!" })
    const action = args[0]?.toLowerCase()
    if (!global.chatbot) global.chatbot = {}
    if (action === "on") {
      global.chatbot[jid] = { mode: "smart" }  // smart = only reply when mentioned/replied
      return sock.sendMessage(jid, {
        text: "🤖 *Chatbot ON!* (Smart Mode)\n\nThe bot will reply when:\n• Someone @mentions the bot\n• Someone replies to the bot's message\n• Someone replies to the owner's message\n\nUse .chatbot all to reply to ALL messages\nUse .chatbot off to turn off"
      })
    }
    if (action === "all") {
      global.chatbot[jid] = { mode: "all" }
      return sock.sendMessage(jid, { text: "🤖 *Chatbot ON!* (All Messages)\n\nReplying to every message!\n\nUse .chatbot off to turn off" })
    }
    if (action === "off") {
      delete global.chatbot[jid]
      return sock.sendMessage(jid, { text: "🤖 *Chatbot OFF.*" })
    }
    const status = global.chatbot[jid]
    sock.sendMessage(jid, {
      text: "🤖 *Chatbot Status:* " + (status ? "ON 🟢 (" + status.mode + " mode)" : "OFF 🔴") + "\n\n.chatbot on — smart mode (mentions/replies)\n.chatbot all — reply to everything\n.chatbot off — turn off"
    })
  }
}
