/**
 * .decide — can't choose? the bot chooses
 */
module.exports = {
  name: "decide",
  category: "fun",
  description: "Pick one option for you",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    const opts = args.join(" ").split(",").map(s => s.trim()).filter(Boolean)
    if (opts.length < 2) return sock.sendMessage(jid, { text: "🤔 Give options: .decide pizza, burger, sushi" }, { quoted: msg })
    const pick = opts[Math.floor(Math.random() * opts.length)]
    await sock.sendMessage(jid, { text: "🧠 *Decision engine:*\n\nChoices: " + opts.join(" · ") + "\n\n✅ Verdict → *" + pick + "*" }, { quoted: msg })
  },
}
