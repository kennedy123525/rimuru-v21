module.exports = {
  name: "8magic",
  async execute(sock, msg, args) {
    if (!args.length) return sock.sendMessage(msg.key.remoteJid, { text: "Ask the magic 8 ball!\nExample: .8magic Will I be rich?" })
    const answers = ["✨ It is certain!","🌟 Definitely yes!","👍 Most likely","🤔 Ask again later","😶 Cannot predict now","❌ Don't count on it","💔 Very doubtful","🚫 My sources say no","🎱 Without a doubt!","⭐ Yes, absolutely!"]
    sock.sendMessage(msg.key.remoteJid, { text: "🎱 *Magic 8 Ball*\n\n❓ " + args.join(" ") + "\n\n" + answers[Math.floor(Math.random()*answers.length)] })
  }
}
