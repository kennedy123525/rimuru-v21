module.exports = {
  name: "number",
  async execute(sock, msg, args) {
    const min = parseInt(args[0]) || 1
    const max = parseInt(args[1]) || 100
    if (min >= max) return sock.sendMessage(msg.key.remoteJid, { text: "❌ Min must be less than max.\nUsage: .number 1 100" })
    const num = Math.floor(Math.random()*(max-min+1))+min
    sock.sendMessage(msg.key.remoteJid, { text: `🎲 *Random Number*\n\nRange: ${min} - ${max}\nResult: *${num}*` })
  }
}
