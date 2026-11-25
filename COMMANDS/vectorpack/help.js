module.exports = {
  name: "help",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    const cmd = args[0]
    const helps = {
      ai: ".ai <question> — Ask AI anything\nExample: .ai What is Nigeria?",
      play: ".play <song> — Download and send audio\nExample: .play Essence Wizkid",
      weather: ".weather <city> — Get weather info\nExample: .weather Lagos",
      translate: ".translate <lang> <text> — Translate text\nExample: .translate fr Hello",
      calc: ".calc <expression> — Calculator\nExample: .calc 5*5+10",
      currency: ".currency <amt> <from> <to> — Convert currency\nExample: .currency 100 USD NGN",
      ship: ".ship <name1> & <name2> — Love meter\nExample: .ship John & Mary",
      hangman: ".hangman — Start game, then .hangman <letter>",
      trivia: ".trivia — Start trivia quiz",
      blackjack: ".blackjack start — Start game, then hit/stand",
    }
    if (cmd && helps[cmd]) return sock.sendMessage(jid, { text: "📖 *Help: ." + cmd + "*\n\n" + helps[cmd] })
    sock.sendMessage(jid, { text: "📖 *Help*\n\nType .help <command> for details.\nExample: .help play\n\nOr type .menu for the full command list." })
  }
}
