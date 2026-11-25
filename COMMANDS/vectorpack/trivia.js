const questions = [
  { q:"What is the capital of Nigeria?", a:"abuja", opts:"A) Lagos  B) Abuja  C) Kano  D) Ibadan" },
  { q:"How many continents are there on Earth?", a:"7", opts:"A) 5  B) 6  C) 7  D) 8" },
  { q:"What is the chemical symbol for water?", a:"h2o", opts:"A) HO  B) H2O  C) HO2  D) H3O" },
  { q:"Which planet is closest to the Sun?", a:"mercury", opts:"A) Venus  B) Earth  C) Mercury  D) Mars" },
  { q:"Who painted the Mona Lisa?", a:"da vinci", opts:"A) Picasso  B) Da Vinci  C) Michelangelo  D) Raphael" },
  { q:"What is the largest ocean on Earth?", a:"pacific", opts:"A) Atlantic  B) Indian  C) Pacific  D) Arctic" },
  { q:"In what year did World War II end?", a:"1945", opts:"A) 1943  B) 1944  C) 1945  D) 1946" },
  { q:"What is the hardest natural substance?", a:"diamond", opts:"A) Gold  B) Iron  C) Diamond  D) Platinum" },
]
const active = {}
module.exports = {
  name: "trivia",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    if (active[jid]) {
      const ans = args.join(" ").toLowerCase()
      if (ans === active[jid].a) {
        delete active[jid]
        return sock.sendMessage(jid, { text: "🎉 *Correct!* Well done! 🏆" })
      }
      const correct = active[jid].a; delete active[jid]
      return sock.sendMessage(jid, { text: `❌ *Wrong!* The answer was *${correct}*\n\nPlay again: .trivia` })
    }
    const q = questions[Math.floor(Math.random()*questions.length)]
    active[jid] = q
    sock.sendMessage(jid, { text: `🎯 *Trivia Time!*\n\n${q.q}\n\n${q.opts}\n\nAnswer: .trivia <answer>` })
  }
}
