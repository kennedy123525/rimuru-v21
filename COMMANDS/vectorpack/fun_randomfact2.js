/**
 * .randomfact — instant fact, no API needed
 */
const FACTS = [
  "Octopuses have three hearts and blue blood.",
  "Bananas are berries, but strawberries aren't.",
  "A day on Venus is longer than its year.",
  "Honey never spoils — 3000-year-old honey is still edible.",
  "Wombat poop is cube-shaped.",
  "Sharks existed before trees.",
  "The Eiffel Tower can grow 15cm taller in summer.",
  "Your brain uses about 20% of your body's energy.",
  "Sea otters hold hands while sleeping so they don't drift apart.",
  "There are more possible chess games than atoms in the observable universe.",
]
module.exports = {
  name: "randomfact",
  category: "fun",
  description: "A random fact from the vault",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    await sock.sendMessage(jid, { text: "🎲 *RANDOM FACT*\n\n" + FACTS[Math.floor(Math.random() * FACTS.length)] }, { quoted: msg })
  },
}
