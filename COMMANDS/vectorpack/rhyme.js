module.exports = {
  name: "rhyme",
  async execute(sock, msg, args) {
    const word = args[0] || "love"
    const rhymes = {
      love:["above","dove","glove","shove","of"],
      day:["way","say","play","stay","ray","pay"],
      night:["light","right","bright","fight","sight","might"],
      time:["rhyme","climb","lime","prime","crime","mime"],
      fire:["higher","desire","inspire","admire","wire"],
      heart:["art","start","smart","part","chart","apart"],
    }
    const found = rhymes[word.toLowerCase()]
    if (found) return sock.sendMessage(msg.key.remoteJid, { text: `🎵 *Rhymes with "${word}"*\n\n${found.join(", ")}` })
    sock.sendMessage(msg.key.remoteJid, { text: `🎵 Some words that might rhyme with "${word}":\nTry words ending in: -${word.slice(-2)} or -${word.slice(-3)}` })
  }
}
