module.exports = {
  name: "anagram",
  async execute(sock, msg, args) {
    const parts = args.join(" ").split("|")
    if (parts.length < 2) return sock.sendMessage(msg.key.remoteJid, { text: "Usage: .anagram <word1> | <word2>\nExample: .anagram listen | silent" })
    const sort = s => s.toLowerCase().replace(/\s/g,"").split("").sort().join("")
    const a = parts[0].trim(), b = parts[1].trim()
    const is = sort(a) === sort(b)
    sock.sendMessage(msg.key.remoteJid, { text: "🔤 *Anagram Check*\n\n\"" + a + "\" & \"" + b + "\"\n\n" + (is ? "✅ YES! They are anagrams!" : "❌ No, not anagrams.") })
  }
}
