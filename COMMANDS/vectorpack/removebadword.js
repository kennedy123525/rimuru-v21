const fs = require("fs"), path = require("path")
module.exports = {
  name: "removebadword",
  async execute(sock, msg, args) {
    const word = args.join(" ").toLowerCase().trim()
    if (!word) return sock.sendMessage(msg.key.remoteJid, { text: "Usage: .removebadword <word>" })
    if (!global.badWords.includes(word)) return sock.sendMessage(msg.key.remoteJid, { text: "⚠️ *" + word + "* is not in the list." })
    global.badWords = global.badWords.filter(w => w !== word)
    const file = require("path").join(__dirname, "../lib/badwords.json")
    require("fs").writeFileSync(file, JSON.stringify(global.badWords, null, 2))
    sock.sendMessage(msg.key.remoteJid, { text: "✅ *" + word + "* removed from bad word list." })
  }
}
