/**
 * .radix — convert numbers between bases
 */
module.exports = {
  name: "radix",
  category: "utility",
  description: "Convert number between bases (2-36)",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    const num = parseInt(args[0]), from = parseInt(args[1]) || 10, to = parseInt(args[2]) || 2
    if (isNaN(num) || from < 2 || from > 36 || to < 2 || to > 36)
      return sock.sendMessage(jid, { text: "🔢 Usage: .radix <number> <fromBase> <toBase>\nExample: .radix 255 10 16" }, { quoted: msg })
    const out = num.toString(to).toUpperCase()
    await sock.sendMessage(jid, { text: "🔢 *" + num + "* (base " + from + ") = *" + out + "* (base " + to + ")" }, { quoted: msg })
  },
}
