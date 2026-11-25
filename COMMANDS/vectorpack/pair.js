const { isPaired } = require("../../lib/auth")
module.exports = {
  name: "pair",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    if (!isPaired(sender)) return sock.sendMessage(jid, { text: "❌ Paired users only!" })
    const num = args[0]?.replace(/\D/g, "").trim()
    if (!num || num.length < 7) return sock.sendMessage(jid, {
      text: "📱 *Pair New Number*\n\nUsage: .pair <number>\nExample: .pair 2348012345678"
    })
    if (typeof global.pairNumber !== "function") return sock.sendMessage(jid, { text: "❌ Use Telegram /pair instead." })
    await sock.sendMessage(jid, { text: "⏳ Generating code for +" + num + "..." })
    await global.pairNumber(num, async (text) => { try { await sock.sendMessage(jid, { text }) } catch {} })
  }
}
