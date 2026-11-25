/**
 * .iq — random IQ score with a roast/praise
 */
const PRAISE = [" Certified genius 🧠", " Einstein would nod 👨‍🔬", " Big brain energy ⚡", " Mensa is calling 📞"]
const ROAST = [" Room temperature 🌡️", " Single-digit vibes 💀", " Two brain cells fighting 🧠⚔️🧠", " Smooth as marble 🪨"]
module.exports = {
  name: "iq",
  category: "fun",
  description: "Measure someone's IQ",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
    const who = target ? "@" + String(target).split("@")[0] : "@" + String(sender).split("@")[0]
    const iq = Math.floor(Math.random() * 200) - 20
    const tag = iq >= 100 ? PRAISE[Math.floor(Math.random() * PRAISE.length)] : ROAST[Math.floor(Math.random() * ROAST.length)]
    await sock.sendMessage(jid, { text: "🧠 *IQ TEST RESULT*\n\n" + who + " → *" + Math.max(1, iq) + "* IQ\n" + tag, mentions: target ? [target] : [sender] }, { quoted: msg })
  },
}
