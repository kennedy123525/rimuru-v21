module.exports = {
  name: "ask",
  async execute(sock, msg, args) {
    const q = args.join(" ")
    if (!q) return sock.sendMessage(msg.key.remoteJid, { text: "Usage: .ask <question>" })
    const answers = ["Yes! 👍","No! 👎","Definitely yes! ✅","Absolutely not! ❌","Maybe... 🤔","Ask me again later 🕐","Signs point to yes ✨","Don't count on it 🚫","Without a doubt! 💯","Very doubtful 😬"]
    sock.sendMessage(msg.key.remoteJid, { text: `❓ *${q}*\n\n${answers[Math.floor(Math.random()*answers.length)]}` })
  }
}
