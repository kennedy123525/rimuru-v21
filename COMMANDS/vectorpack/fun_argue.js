/**
 * .argue — the bot takes the opposite stance
 */
module.exports = {
  name: "argue",
  category: "fun",
  description: "Bot debates the opposite view",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    const claim = args.join(" ").trim()
    if (!claim) return sock.sendMessage(jid, { text: "⚔️ State a claim: .argue pineapple belongs on pizza" }, { quoted: msg })
    const counters = [
      "Strong claim. Weak evidence. 📉",
      "That's exactly what someone on the wrong side would say 🧐",
      "Counterpoint: gravity disagrees with you on many levels 🌍",
      "Interesting. Bold. Incorrect. ✅",
      "Sources: your vibes. Not admissible in court ⚖️",
      "I've consulted the ancient scrolls — they say otherwise 📜",
    ]
    await sock.sendMessage(jid, { text: "⚔️ *DEBATE MODE*\n\n🗣️ You: " + claim + "\n\n🤖 Vector: " + counters[Math.floor(Math.random() * counters.length)] }, { quoted: msg })
  },
}
