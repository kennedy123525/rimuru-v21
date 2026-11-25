/**
 * .praise — wholesome compliment bomb
 */
const P = ["You make group chats worth opening 💫", "Main character energy detected 🎬", "Your vibe? Immaculate ✨", "Built different, certified 🏗️", "The group would be quieter without you 🔊", "10/10 human, no notes 📝"]
module.exports = {
  name: "praise",
  category: "fun",
  description: "Send someone wholesome praise",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || sender
    await sock.sendMessage(jid, { text: "🌟 *PRAISE DELIVERY*\n\n@" + String(target).split("@")[0] + "\n\n" + P[Math.floor(Math.random() * P.length)], mentions: [target] }, { quoted: msg })
  },
}
