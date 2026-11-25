module.exports = {
  name: "palindrome",
  async execute(sock, msg, args) {
    const text = args.join(" ").toLowerCase().replace(/[^a-z0-9]/g, "")
    if (!text) return sock.sendMessage(msg.key.remoteJid, { text: "Usage: .palindrome <word/phrase>" })
    const reversed = text.split("").reverse().join("")
    const is = text === reversed
    sock.sendMessage(msg.key.remoteJid, { text: "🔄 *Palindrome Check*\n\n\"" + args.join(" ") + "\"\n\n" + (is ? "✅ YES! It is a palindrome!" : "❌ No, it is not a palindrome.") })
  }
}
