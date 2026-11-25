/**
 * .simp — simp percentage
 */
module.exports = {
  name: "simp",
  category: "fun",
  description: "Measure simp levels",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || sender
    const pct = Math.floor(Math.random() * 101)
    const bar = "█".repeat(Math.round(pct / 10)) + "░".repeat(10 - Math.round(pct / 10))
    const t = pct > 90 ? "Certified SIMP 💳💔" : pct > 70 ? "Hopeless romantic 💘" : pct > 50 ? "Part-time simp 😅" : pct > 30 ? "Keeping it casual 😎" : "Sigma grinder 🗿"
    await sock.sendMessage(jid, { text: "💳 *SIMP CALCULATOR*\n\n@" + String(target).split("@")[0] + "\n" + bar + " *" + pct + "%*\n" + t, mentions: [target] }, { quoted: msg })
  },
}
