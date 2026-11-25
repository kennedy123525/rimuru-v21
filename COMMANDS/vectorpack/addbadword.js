const { isPaired } = require("../../lib/auth")
module.exports = {
  name: "addbadword",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    if (!isPaired(sender)) return sock.sendMessage(jid, { text: "❌ Paired users only!" })
    const word = args.join(" ").trim().toLowerCase()
    if (!word) return sock.sendMessage(jid, { text: "Usage: .addbadword <word>" })
    if (!global.badWords) global.badWords = []
    if (global.badWords.includes(word)) return sock.sendMessage(jid, { text: "⚠️ *" + word + "* is already in the bad words list!" })
    global.badWords.push(word)
    const fs = require("fs"), path = require("path")
    try { fs.writeFileSync(path.join(__dirname,"../lib/badwords.json"), JSON.stringify(global.badWords, null, 2)) } catch {}
    if (global.saveState) global.saveState()
    sock.sendMessage(jid, { text: "✅ *" + word + "* added to bad words list!\n\nTotal: " + global.badWords.length + " words" })
  }
}
