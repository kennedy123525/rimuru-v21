const qs = [
  {q:"What is the capital of France?", a:"paris", opts:"A)London B)Berlin C)Paris D)Rome"},
  {q:"How many days in a leap year?", a:"366", opts:"A)364 B)365 C)366 D)367"},
  {q:"What is H2O commonly known as?", a:"water", opts:"A)Hydrogen B)Oxygen C)Water D)Steam"},
  {q:"How many sides does a hexagon have?", a:"6", opts:"A)5 B)6 C)7 D)8"},
  {q:"What planet is known as the Red Planet?", a:"mars", opts:"A)Venus B)Jupiter C)Saturn D)Mars"},
  {q:"Who wrote Romeo and Juliet?", a:"shakespeare", opts:"A)Dickens B)Shakespeare C)Twain D)Poe"},
  {q:"What is the largest continent?", a:"asia", opts:"A)Africa B)Europe C)Asia D)America"},
  {q:"How many colors in a rainbow?", a:"7", opts:"A)5 B)6 C)7 D)8"},
]
const active={}
module.exports = {
  name: "quiz",
  async execute(sock, msg, args) {
    const jid=msg.key.remoteJid
    if(active[jid]){
      const ans=args.join(" ").toLowerCase()
      const correct=ans===active[jid].a
      const a=active[jid].a;delete active[jid]
      return sock.sendMessage(jid,{text:correct?"🎉 *Correct!*":"❌ *Wrong!* The answer was *"+a+"*\n\nPlay again: .quiz"})
    }
    const q=qs[Math.floor(Math.random()*qs.length)]
    active[jid]=q
    sock.sendMessage(jid,{text:`🎯 *Quiz Time!*\n\n${q.q}\n\n${q.opts}\n\nAnswer: .quiz <answer>`})
  }
}
