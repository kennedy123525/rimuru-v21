/**
 * .cap — cap detector
 */
module.exports = {
  name: "cap",
  category: "fun",
  description: "Detect how much cap is in a message",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
    if (!target) return sock.sendMessage(jid, { text: "🧢 Tag the suspect: .cap @user" }, { quoted: msg })
    const pct = Math.floor(Math.random() * 101)
    const t = pct > 80 ? "🚨 FULL CAP ALERT 🚨" : pct > 50 ? "🧢🧢 double cap 🧢🧢" : pct > 25 ? "mild cap detected 🫣" : "no cap fr fr ✅"
    await sock.sendMessage(jid, { text: "🧢 *CAP DETECTOR*\n\n@" + String(target).split("@")[0] + " is *" + pct + "% cap*\n" + t, mentions: [target] }, { quoted: msg })
  },
}
