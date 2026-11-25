module.exports = {
  name: "spam",
  async execute(sock, msg, args) {
    const times = Math.min(parseInt(args[0])||3, 5)
    const text = args.slice(1).join(" ")
    if (!text) return sock.sendMessage(msg.key.remoteJid, { text: "Usage: .spam <times> <text>\nMax: 5 times" })
    for (let i=0;i<times;i++) {
      await sock.sendMessage(msg.key.remoteJid, { text })
      await new Promise(r=>setTimeout(r,500))
    }
  }
}
