/**
 * .memorygame — repeat the emoji sequence
 */
const EMOJIS = ["🍎","🚀","🐸","⚡","🌟","🎲","🔥","🎈","👾","🎧"]
module.exports = {
  name: "memorygame",
  category: "games",
  description: "Memorize the emoji sequence",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    if (!global.memGames) global.memGames = {}
    const g = global.memGames[sender]
    if (g && g.answer) {
      const ok = args.join(" ").trim() === g.answer.join(" ")
      const ans = g.answer.join(" ")
      if (ok) {
        const level = g.level + 1
        delete global.memGames[sender]
        return sock.sendMessage(jid, { text: "✅ *PERFECT MEMORY!* Level " + level + " cleared.\nPlay .memorygame for level " + (level + 1) }, { quoted: msg })
      }
      delete global.memGames[sender]
      return sock.sendMessage(jid, { text: "❌ Wrong! It was: " + ans + "\nMade it to level " + g.level }, { quoted: msg })
    }
    const level = 1 + Math.floor(Math.random() * 5)
    const seq = Array.from({ length: level }, () => EMOJIS[Math.floor(Math.random() * EMOJIS.length)])
    global.memGames[sender] = { answer: seq, level }
    await sock.sendMessage(jid, { text: "🧠 *MEMORY LEVEL " + level + "*\n\n" + seq.join(" ") + "\n\nMemorize it, then send:\n.memoryanswer " + seq.join(" ") }, { quoted: msg })
  },
}
