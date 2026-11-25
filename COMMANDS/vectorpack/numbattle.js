module.exports = {
  name: "numbattle",
  async execute(sock, msg, args) {
    const p = parseInt(args[0])
    if (isNaN(p)||p<1||p>10) return sock.sendMessage(msg.key.remoteJid, {text:"Pick a number 1-10!\nUsage: .numbattle 7"})
    const b = Math.floor(Math.random()*10)+1
    const r = p>b ? "🎉 You WIN!" : p<b ? "😅 Bot WINS!" : "🤝 Tie!"
    sock.sendMessage(msg.key.remoteJid, {text:`⚔️ *Number Battle*\n\nYour number: *${p}*\nBot's number: *${b}*\n\n${r}`})
  }
}