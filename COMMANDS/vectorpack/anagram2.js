module.exports = {
  name: "isanagram",
  async execute(sock, msg, args) {
    const j = msg.key.remoteJid
    if (args.length < 2) return sock.sendMessage(j, { text: "Usage: .isanagram <word1> <word2>\nExample: .isanagram listen silent" })
    const w1 = args[0].toLowerCase().replace(/[^a-z]/g, "")
    const w2 = args[1].toLowerCase().replace(/[^a-z]/g, "")
    const sort = w => w.split("").sort().join("")
    const yes = sort(w1) === sort(w2)
    sock.sendMessage(j, {
      text: "🔤 *Anagram Check*\n\n📝 " + args[0] + " vs " + args[1] + "\n\n" +
            (yes ? "✅ YES! They are anagrams!\n\nBoth use the same letters!" : "❌ No, they are NOT anagrams")
    })
  }
}
