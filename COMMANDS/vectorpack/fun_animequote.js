/**
 * .animequote — quote from the anime universe
 */
const QUOTES = [
  ["If you don't take risks, you can't create a future.", "Monkey D. Luffy"],
  ["A lesson without pain is meaningless.", "Edward Elric"],
  ["The moment you think of giving up, think of the reason you held on.", "Naruto Uzumaki"],
  ["Power comes in response to a need, not a desire.", "Goku"],
  ["It's not the face that makes someone a monster — it's the choices.", "Saitama"],
  ["Fear is freedom! Subjugation is liberation!", "Satsuki Kiryuin"],
  ["Humans are strong because we have things we want to protect.", "Ichigo Kurosaki"],
  ["No matter how hard it gets, never stop moving forward.", "Deku"],
]
module.exports = {
  name: "animequote",
  category: "fun",
  description: "Random anime quote",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    const [q, who] = QUOTES[Math.floor(Math.random() * QUOTES.length)]
    await sock.sendMessage(jid, { text: "🎋 *ANIME QUOTE*\n\n『" + q + "』\n\n— *" + who + "*" }, { quoted: msg })
  },
}
