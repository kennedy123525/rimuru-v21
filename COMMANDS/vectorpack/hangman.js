const words = ["javascript","python","whatsapp","computer","elephant","keyboard","internet","telegram","awesome","developer","android","termux"]
const active = {}
module.exports = {
  name: "hangman",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    if (!active[jid]) {
      active[jid] = { word: words[Math.floor(Math.random()*words.length)], guessed: [], wrong: 0 }
    }
    const game = active[jid]
    if (args[0]) {
      const l = args[0].toLowerCase()[0]
      if (!game.guessed.includes(l)) game.guessed.push(l)
      if (!game.word.includes(l)) game.wrong++
    }
    const display = game.word.split("").map(c => game.guessed.includes(c) ? c : "_").join(" ")
    if (!display.includes("_")) {
      delete active[jid]
      return sock.sendMessage(jid, {text:`🎉 You won! The word was: *${game.word}*`})
    }
    if (game.wrong >= 6) {
      const w = game.word; delete active[jid]
      return sock.sendMessage(jid, {text:`💀 Game over! The word was: *${w}*`})
    }
    sock.sendMessage(jid, {text:`🎮 *Hangman* [${6-game.wrong} lives left]\n\n${display}\n\nWrong: ${game.wrong}/6\nGuessed: ${game.guessed.join(", ")||"none"}\n\nGuess: .hangman <letter>`})
  }
}