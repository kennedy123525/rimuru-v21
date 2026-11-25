/**
 * .charcount — character statistics
 */
module.exports = {
  name: "charcount",
  category: "utility",
  description: "Count characters, words, lines",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage
    const text = args.join(" ") || quoted?.conversation || quoted?.extendedTextMessage?.text || ""
    if (!text) return sock.sendMessage(jid, { text: "🔢 Usage: .charcount <text> or reply to a message" }, { quoted: msg })
    const words = text.trim().split(/\s+/).filter(Boolean).length
    const chars = text.length
    const noSpace = text.replace(/\s/g, "").length
    const lines = text.split("\n").length
    const readMins = Math.max(1, Math.round(words / 200))
    await sock.sendMessage(jid, { text: "🔢 *TEXT STATS*\n\n📝 Characters: " + chars + "\n🚫 No spaces: " + noSpace + "\n💬 Words: " + words + "\n📄 Lines: " + lines + "\n⏱️ Read time: ~" + readMins + " min" }, { quoted: msg })
  },
}
