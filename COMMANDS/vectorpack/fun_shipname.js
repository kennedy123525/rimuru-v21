/**
 * .shipname — merge two names into a ship name
 */
module.exports = {
  name: "shipname",
  category: "fun",
  description: "Create a couple name from two people",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
    if (!target) return sock.sendMessage(jid, { text: "💞 Tag the other person: .shipname @user" }, { quoted: msg })
    const a = (msg.pushName || "You").split(" ")[0]
    const b = "@" + String(target).split("@")[0]
    const half = (s, take) => s.slice(0, Math.ceil(s.length * take))
    const mash1 = half(a.replace(/[^A-Za-z]/g, "") || "A", 0.6) + half(String(target).split("@")[0], 0.5)
    const mash2 = half(String(target).split("@")[0], 0.6) + half(a.replace(/[^A-Za-z]/g, "") || "B", 0.5)
    await sock.sendMessage(jid, { text: "💞 *SHIP NAME LAB*\n\nOptions:\n• *" + mash1 + "*\n• *" + mash2 + "*\n\nShip meter: " + (50 + Math.floor(Math.random() * 50)) + "% 🚢", mentions: [target] }, { quoted: msg })
  },
}
