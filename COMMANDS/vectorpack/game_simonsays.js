/**
 * .simonsays — do what Simon says
 */
module.exports = {
  name: "simonsays",
  category: "games",
  description: "Simon says command game",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    const cmds = [".menu", ".ping", ".joke", ".fact", ".dice", ".quote", ".time", ".flip"]
    const real = cmds[Math.floor(Math.random() * cmds.length)]
    const fake = cmds[Math.floor(Math.random() * cmds.length)]
    const simonSays = Math.random() < 0.5
    const chosen = simonSays ? real : fake
    await sock.sendMessage(jid, { text: "🧑‍✈️ *SIMON SAYS*\n\n" + (simonSays ? "Simon says: run *" + chosen + "* right now!" : "Run *" + chosen + "* right now! (no Simon!)") + "\n\nIf Simon said it — run it. If not — DO NOT 🚫" }, { quoted: msg })
  },
}
