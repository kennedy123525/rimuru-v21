/**
 * .lorem — lorem ipsum generator
 */
const WORDS = ["lorem","ipsum","dolor","sit","amet","consectetur","adipiscing","elit","sed","do","eiusmod","tempor","incididunt","labore","dolore","magna","aliqua","enim","minim","veniam","quis","nostrud","exercitation","ullamco","laboris","nisi","aliquip","ex","ea","commodo","consequat"]
module.exports = {
  name: "lorem",
  category: "utility",
  description: "Generate lorem ipsum text",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    const count = Math.min(parseInt(args[0]) || 30, 150)
    const out = Array.from({ length: count }, () => WORDS[Math.floor(Math.random() * WORDS.length)]).join(" ")
    const sentences = out.replace(/(\w+ \w+ \w+) /g, "$1. ")
    await sock.sendMessage(jid, { text: "📄 *LOREM IPSUM*\n\n" + sentences.charAt(0).toUpperCase() + sentences.slice(1) + "." }, { quoted: msg })
  },
}
