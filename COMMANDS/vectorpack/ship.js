module.exports = {
  name: "ship",
  async execute(sock, msg, args) {
    const parts = args.join(" ").split("&")
    const p1 = (parts[0]||"Person 1").trim(), p2 = (parts[1]||"Person 2").trim()
    const pct = Math.floor(Math.random()*101)
    const bar = "█".repeat(Math.floor(pct/10))+"░".repeat(10-Math.floor(pct/10))
    const verdict = pct>=80?"💕 Soulmates!":pct>=60?"💖 Great match!":pct>=40?"😊 Could work!":pct>=20?"🤔 Needs effort":"💔 Not meant to be"
    sock.sendMessage(msg.key.remoteJid, {text:`💘 *Ship Meter*\n\n${p1} + ${p2}\n\n[${bar}] ${pct}%\n\n${verdict}`})
  }
}