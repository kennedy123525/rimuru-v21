module.exports = {
  name: "rank",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    const fs = require("fs"), path = require("path")
    try {
      const dbFile = path.join(__dirname, "../lib/database.json")
      const db = JSON.parse(fs.readFileSync(dbFile, "utf8"))
      const user = db.users[sender] || { xp: 0, level: 1 }
      const nextLevel = user.level + 1
      const xpNeeded = Math.pow(nextLevel/0.1, 2)
      const progress = Math.min(100, Math.floor((user.xp / xpNeeded) * 100))
      const bar = "█".repeat(Math.floor(progress/10)) + "░".repeat(10-Math.floor(progress/10))
      sock.sendMessage(jid, { text: "📊 *Your Rank*\n\n👤 " + (msg.pushName||"User") + "\n⭐ Level: *" + user.level + "*\n✨ XP: *" + user.xp + "*\n\n[" + bar + "] " + progress + "%\nTo Level " + nextLevel + ": " + Math.max(0, Math.floor(xpNeeded-user.xp)) + " XP needed" })
    } catch { sock.sendMessage(jid, { text: "❌ No rank data yet. Keep chatting!" }) }
  }
}
