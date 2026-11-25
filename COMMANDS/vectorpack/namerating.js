module.exports = {
  name: "namerating",
  async execute(sock, msg, args) {
    const name = args.join(" ")
    if (!name) return sock.sendMessage(msg.key.remoteJid, { text: "Usage: .namerating <name>" })
    const score = (name.split("").reduce((a,c) => a+c.charCodeAt(0), 0) % 100) + 1
    const adj = score >= 90 ? "Legendary 🏆" : score >= 75 ? "Excellent 🌟" : score >= 60 ? "Great 👍" : score >= 45 ? "Average 😐" : "Needs work 😬"
    const bar = "█".repeat(Math.floor(score/10)) + "░".repeat(10-Math.floor(score/10))
    sock.sendMessage(msg.key.remoteJid, { text: "📊 *Name Rating: " + name + "*\n\n[" + bar + "] " + score + "/100\n\n" + adj })
  }
}
