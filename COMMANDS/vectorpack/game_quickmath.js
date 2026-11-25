/**
 * .quickmath — solve the math problem fast
 */
module.exports = {
  name: "quickmath",
  category: "games",
  description: "Instant math duel vs the bot",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    if (!global.qmGames) global.qmGames = {}
    const g = global.qmGames[sender]
    if (g) {
      if (parseInt(args[0]) === g.ans) { const t = (Date.now() - g.start) / 1000; delete global.qmGames[sender]; return sock.sendMessage(jid, { text: "✅ *CORRECT* in " + t.toFixed(1) + "s!\n" + g.q + " = " + g.ans }, { quoted: msg }) }
      delete global.qmGames[sender]
      return sock.sendMessage(jid, { text: "❌ Wrong! " + g.q + " = *" + g.ans + "*" }, { quoted: msg })
    }
    const a = 2 + Math.floor(Math.random() * 40), b = 2 + Math.floor(Math.random() * 30)
    const ops = [["+", a + b], ["×", a * b], ["-", Math.abs(a - b)]]
    const [op, ans] = ops[Math.floor(Math.random() * ops.length)]
    const q = Math.min(a, b) + " " + op + " " + Math.max(a, b)
    global.qmGames[sender] = { q, ans, start: Date.now() }
    await sock.sendMessage(jid, { text: "🧮 *QUICK MATH*\n\nWhat is: *" + q + "* ?\nAnswer: .quickmath <number>\n⏱️ No timer but your honor is at stake" }, { quoted: msg })
  },
}
