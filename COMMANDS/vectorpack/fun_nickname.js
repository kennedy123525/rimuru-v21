/**
 * .nickname — generate a nickname
 */
const PRE = ["Cyber", "Turbo", "Ghost", "Neon", "Frost", "Blaze", "Shadow", "Titan", "Rogue", "Omega", "Pixel", "Vortex"]
const SUF = ["Wolf", "King", "Rider", "Storm", "Reaper", "Sniper", "Viper", "Legend", "Beast", "Hunter", "Samurai", "Phantom"]
module.exports = {
  name: "nickname",
  category: "fun",
  description: "Generate a cool nickname",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || sender
    const nick = PRE[Math.floor(Math.random() * PRE.length)] + SUF[Math.floor(Math.random() * SUF.length)]
    const num = Math.floor(Math.random() * 100)
    await sock.sendMessage(jid, { text: "🏷️ *NICKNAME GENERATOR*\n\n@" + String(target).split("@")[0] + " → *" + nick + num + "*" , mentions: [target] }, { quoted: msg })
  },
}
