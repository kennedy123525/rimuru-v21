const active = {}
module.exports = {
  name: "math",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    if (active[jid]) {
      const ans = parseInt(args[0])
      const correct = ans === active[jid].answer
      delete active[jid]
      return sock.sendMessage(jid, {text: correct ? "🎉 Correct! Well done!" : `❌ Wrong! The answer was *${active[jid]?.answer}*`})
    }
    const ops = ["+","-","*"]
    const op = ops[Math.floor(Math.random()*3)]
    const a = Math.floor(Math.random()*20)+1
    const b = Math.floor(Math.random()*10)+1
    const answer = op==="+" ? a+b : op==="-" ? a-b : a*b
    active[jid] = {answer}
    sock.sendMessage(jid, {text:`🧮 *Math Quiz*\n\nWhat is *${a} ${op} ${b}*?\n\nAnswer: .math <number>`})
  }
}