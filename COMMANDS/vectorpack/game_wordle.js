/**
 * .wordle — guess the 5-letter word
 */
const WORDS = ["pixel","storm","chair","beast","frost","lemon","ocean","piano","tiger","cloud","dream","flame","ghost","honey","light","money","night","plant","queen","river","space","tiger","vivid","water","zebra"]
const games = {}
module.exports = {
  name: "wordle",
  category: "games",
  description: "5-letter word guessing game",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    const g = games[jid]
    const guess = (args[0] || "").toLowerCase().replace(/[^a-z]/g, "")
    if (!g) {
      if (!guess) {
        const w = WORDS[Math.floor(Math.random() * WORDS.length)]
        games[jid] = { word: w, tries: 0 }
        return sock.sendMessage(jid, { text: "🎯 *VECTOR WORDLE*\n\nI picked a 5-letter word.\nGuess with: .wordle <word>\n🟩 right spot · 🟨 wrong spot · ⬛ miss" }, { quoted: msg })
      }
    }
    if (!g) return sock.sendMessage(jid, { text: "Start a game first: .wordle" }, { quoted: msg })
    if (guess === "quit") { delete games[jid]; return sock.sendMessage(jid, { text: "🏳️ Game ended. The word was *" + g.word + "*" }, { quoted: msg }) }
    if (guess.length !== 5) return sock.sendMessage(jid, { text: "❌ Must be exactly 5 letters!" }, { quoted: msg })
    g.tries++
    if (guess === g.word) { delete games[jid]; return sock.sendMessage(jid, { text: "🎉 *CORRECT!* You got it in " + g.tries + " " + (g.tries === 1 ? "try" : "tries") + "!\nThe word was *" + g.word.toUpperCase() + "*" }, { quoted: msg }) }
    let tiles = ""
    for (let i = 0; i < 5; i++) {
      const c = guess[i]
      if (c === g.word[i]) tiles += "🟩"
      else if (g.word.includes(c)) tiles += "🟨"
      else tiles += "⬛"
    }
    if (g.tries >= 6) { delete games[jid]; return sock.sendMessage(jid, { text: tiles + " " + guess.toUpperCase() + "\n\n💀 Out of tries! The word was *" + g.word.toUpperCase() + "*" }, { quoted: msg }) }
    await sock.sendMessage(jid, { text: tiles + " " + guess.toUpperCase() + "\n\nTry " + g.tries + "/6 · .wordle quit to give up" }, { quoted: msg })
  },
}
