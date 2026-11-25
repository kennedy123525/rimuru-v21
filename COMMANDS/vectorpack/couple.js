module.exports = {
  name: "couple",
  async execute(sock, msg, args) {
    const parts = args.join(" ").split("&")
    const p1 = (parts[0]||"Person 1").trim(), p2 = (parts[1]||"Person 2").trim()
    const score = Math.floor(Math.random()*101)
    const emojis = score>=90?"💍":score>=75?"💖":score>=50?"💕":score>=25?"🙂":"💔"
    const msg2 = score>=90?"SOULMATES! Get married already!":score>=75?"Amazing couple! Keep it up!":score>=50?"Good match. Work on it!":score>=25?"It's complicated...":"Maybe just be friends?"
    sock.sendMessage(msg.key.remoteJid, { text: emojis + " *Couple Test*\n\n" + p1 + " + " + p2 + "\n\n❤️ Score: *" + score + "%*\n\n" + msg2 })
  }
}
