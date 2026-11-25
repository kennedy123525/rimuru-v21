module.exports = {
  name: "lovecalc",
  async execute(sock, msg, args) {
    const parts = args.join(" ").split("&")
    const p1 = (parts[0]||"You").trim()
    const p2 = (parts[1]||"Them").trim()
    const pct = Math.floor(Math.random()*101)
    const heart = pct>=80?"💖 PERFECT MATCH!":pct>=60?"💕 Great match!":pct>=40?"😊 Could work!":pct>=20?"🤔 Needs work":"💔 Not meant to be"
    const bar = "❤️".repeat(Math.floor(pct/10))+"🖤".repeat(10-Math.floor(pct/10))
    sock.sendMessage(msg.key.remoteJid, { text: `💘 *Love Calculator*\n\n${p1} + ${p2}\n\n${bar}\n*${pct}%* — ${heart}` })
  }
}
