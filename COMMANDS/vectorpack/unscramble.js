module.exports = {
  name: "unscramble",
  async execute(sock, msg, args) {
    const word = args[0]
    if (!word) return sock.sendMessage(msg.key.remoteJid, { text: "Usage: .unscramble <scrambled word>" })
    const scrambled = word.split("").sort(() => Math.random()-0.5).join("")
    sock.sendMessage(msg.key.remoteJid, { text: "🔀 *Scramble*\n\nOriginal: *" + word + "*\nScrambled: *" + scrambled + "*\n\nCan you unscramble it?" })
  }
}
