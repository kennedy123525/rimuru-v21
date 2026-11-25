module.exports = {
  name: "reverse",
  async execute(sock, msg, args) {
    const text = args.join(" ")
    if (!text) return sock.sendMessage(msg.key.remoteJid, { text: "Usage: .reverse <text>" })
    sock.sendMessage(msg.key.remoteJid, { text: `🔄 *Reversed:*\n\n${text.split("").reverse().join("")}` })
  }
}
