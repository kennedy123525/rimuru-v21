/**
 * .wisdom — cursed wisdom
 */
const LINES = [
  "The mountain you are climbing is also inside you. Also, bring snacks.",
  "If the doors of perception were cleansed, you'd still lose your keys.",
  "A watched pot never boils, but an unwatched pot starts a family.",
  "You miss 100% of the naps you don't take.",
  "The best time to plant a tree was 20 years ago. The second best time is never, the Wi-Fi is outside.",
  "Silence is golden. Duct tape is silver.",
  "If at first you don't succeed, redefine success.",
]
module.exports = {
  name: "wisdom",
  category: "fun",
  description: "Receive cursed wisdom",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    await sock.sendMessage(jid, { text: "🦉 *CURSED WISDOM*\n\n" + LINES[Math.floor(Math.random() * LINES.length)] }, { quoted: msg })
  },
}
