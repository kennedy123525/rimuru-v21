module.exports = {
  name: "coinflip",
  async execute(sock, msg, args) {
    const guess = args[0]?.toLowerCase()
    const result = Math.random() < 0.5 ? "heads" : "tails"
    const emoji = result === "heads" ? "🪙 HEADS" : "🪙 TAILS"
    if (guess && ["heads","tails","h","t"].includes(guess)) {
      const g = guess[0] === "h" ? "heads" : "tails"
      const won = g === result
      sock.sendMessage(msg.key.remoteJid, { text: "🪙 *Coin Flip*\n\nYou guessed: *" + g + "*\nResult: *" + emoji + "*\n\n" + (won ? "🎉 You were RIGHT!" : "😅 You were WRONG!") })
    } else {
      sock.sendMessage(msg.key.remoteJid, { text: "🪙 *Coin Flip*\n\nResult: *" + emoji + "*\n\nGuess with: .coinflip heads/tails" })
    }
  }
}
