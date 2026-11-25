/**
 * .higherlower — guess the number higher or lower
 */
module.exports = {
  name: "higherlower",
  category: "games",
  description: "Higher or lower number game",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    if (!global.hlGames) global.hlGames = {}
    const g = global.hlGames[sender]
    const guess = parseInt(args[0])
    if (!g) {
      if (!guess) {
        global.hlGames[sender] = { num: 1 + Math.floor(Math.random() * 100), tries: 0 }
        return sock.sendMessage(jid, { text: "🔢 *HIGHER OR LOWER*\n\nI picked a number 1-100.\nGuess: .higherlower <number>" }, { quoted: msg })
      }
    }
    const gg = global.hlGames[sender]
    if (!gg) return sock.sendMessage(jid, { text: "Start first: .higherlower" }, { quoted: msg })
    if (!guess) return sock.sendMessage(jid, { text: "🔢 Guess: .higherlower <number>" }, { quoted: msg })
    gg.tries++
    if (guess === gg.num) { delete global.hlGames[sender]; return sock.sendMessage(jid, { text: "🎉 *CORRECT!* " + guess + " was it — " + gg.tries + " " + (gg.tries === 1 ? "guess" : "guesses") + "!" }, { quoted: msg }) }
    if (gg.tries >= 7) { const n = gg.num; delete global.hlGames[sender]; return sock.sendMessage(jid, { text: "💀 Out of guesses! It was *" + n + "*" }, { quoted: msg }) }
    await sock.sendMessage(jid, { text: guess > gg.num ? "📉 *LOWER!* (" + gg.tries + "/7)" : "📈 *HIGHER!* (" + gg.tries + "/7)" }, { quoted: msg })
  },
}
