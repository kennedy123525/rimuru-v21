/**
 * .chucknorris — Chuck Norris facts
 */
const ezapi = require("../../lib/ezapi")
const FALLBACK = ["Chuck Norris once threw a grenade and killed 50 people... then it exploded.", "Chuck Norris can slam a revolving door.", "Chuck Norris counted to infinity. Twice."]
module.exports = {
  name: "chucknorris",
  category: "fun",
  description: "Random Chuck Norris fact",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    const fact = await ezapi.tryChain([
      async () => { const d = await ezapi.getJSON("https://api.chucknorris.io/jokes/random"); return d?.value || null },
      async () => FALLBACK[Math.floor(Math.random() * FALLBACK.length)],
    ], "chucknorris") || FALLBACK[0]
    await sock.sendMessage(jid, { text: "💪 *CHUCK NORRIS FACT*\n\n" + fact }, { quoted: msg })
  },
}
