module.exports = {
  name: "countdown",
  async execute(sock, msg, args) {
    const event = args.join(" ") || "New Year"
    const now = new Date()
    const nextYear = new Date(now.getFullYear()+1, 0, 1)
    const diff = nextYear - now
    const d = Math.floor(diff/86400000)
    const h = Math.floor((diff%86400000)/3600000)
    const m = Math.floor((diff%3600000)/60000)
    sock.sendMessage(msg.key.remoteJid, { text: `⏳ *Countdown to ${event}*\n\n${d} days, ${h} hours, ${m} minutes remaining!` })
  }
}
