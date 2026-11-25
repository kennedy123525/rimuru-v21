const quizzes = [
  {q:"🦁👑", a:"lion king"},
  {q:"🕷️👨", a:"spiderman"},
  {q:"🧊👸", a:"frozen"},
  {q:"🦇🦸", a:"batman"},
  {q:"🧙💍🌋", a:"lord of the rings"},
  {q:"🦈🎵", a:"jaws"},
  {q:"🚂⏰", a:"polar express"},
  {q:"🦖🌴", a:"jurassic park"}
]
const active = {}
module.exports = {
  name: "emojiquiz",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    if (!active[jid]) {
      active[jid] = quizzes[Math.floor(Math.random()*quizzes.length)]
      return sock.sendMessage(jid, {text:`🎮 *Emoji Quiz!*\n\n${active[jid].q}\n\nWhat is this?\nAnswer: .emojiquiz <answer>`})
    }
    const guess = args.join(" ").toLowerCase()
    if (guess === active[jid].a) {
      delete active[jid]
      return sock.sendMessage(jid, {text:"🎉 Correct! Amazing!"})
    }
    const ans = active[jid].a; delete active[jid]
    sock.sendMessage(jid, {text:`❌ Wrong! It was *${ans}*\nPlay again: .emojiquiz`})
  }
}