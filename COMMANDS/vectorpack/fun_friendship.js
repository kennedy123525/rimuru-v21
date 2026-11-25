/**
 * .friendship — friendship score between two people
 */
module.exports = {
  name: "friendship",
  category: "fun",
  description: "Friendship meter between you and someone",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
    if (!target) return sock.sendMessage(jid, { text: "🤝 Tag someone: .friendship @user" }, { quoted: msg })
    const pct = 30 + Math.floor(Math.random() * 70)
    const bar = "█".repeat(Math.round(pct / 10)) + "░".repeat(10 - Math.round(pct / 10))
    const verdict = pct > 85 ? "Soul siblings 👯" : pct > 60 ? "Ride or die 🔥" : pct > 40 ? "Decent duo 👍" : "Frenemies 🙃"
    await sock.sendMessage(jid, { text: "🤝 *FRIENDSHIP METER*\n\n@" + String(sender).split("@")[0] + " × @" + String(target).split("@")[0] + "\n\n" + bar + " *" + pct + "%*\n" + verdict, mentions: [sender, target] }, { quoted: msg })
  },
}
