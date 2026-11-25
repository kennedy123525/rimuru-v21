const words = [
  { word:"PYTHON", hint:"A programming language" },
  { word:"WHATSAPP", hint:"A messaging app" },
  { word:"COMPUTER", hint:"An electronic device" },
  { word:"ELEPHANT", hint:"A large African animal" },
  { word:"INTERNET", hint:"A global network" },
  { word:"KEYBOARD", hint:"An input device" },
  { word:"ANDROID", hint:"A mobile OS" },
  { word:"NIGERIA", hint:"A West African country" },
]
const active = {}
function scramble(word) {
  return word.split("").sort(() => Math.random()-0.5).join("")
}
module.exports = {
  name: "wordscramble",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    if (active[jid]) {
      const guess = args.join(" ").toUpperCase()
      if (guess === active[jid].word) {
        delete active[jid]
        return sock.sendMessage(jid, { text: "🎉 *Correct!* You unscrambled it!" })
      }
      const w = active[jid].word; delete active[jid]
      return sock.sendMessage(jid, { text: `❌ Wrong! The word was *${w}*` })
    }
    const item = words[Math.floor(Math.random()*words.length)]
    active[jid] = item
    const scrambled = scramble(item.word)
    sock.sendMessage(jid, { text: `🔀 *Word Scramble!*\n\nUnscramble: *${scrambled}*\n💡 Hint: ${item.hint}\n\nAnswer: .wordscramble <word>` })
  }
}
