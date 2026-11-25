module.exports = {
  name: "8ball",
  async execute(sock, msg, args) {
    if (!args.length) return sock.sendMessage(msg.key.remoteJid, {text:"Ask me a question!\nExample: .8ball Will I be rich?"})
    const answers = ["✅ Yes definitely!","✅ It is certain","✅ Without a doubt","✅ Most likely","🤔 Ask again later","🤔 Cannot predict now","🤔 Concentrate and ask again","❌ Don't count on it","❌ My reply is no","❌ Very doubtful"]
    sock.sendMessage(msg.key.remoteJid, {text:`🎱 *Magic 8-Ball*\n\n❓ ${args.join(" ")}\n\n${answers[Math.floor(Math.random()*answers.length)]}`})
  }
}