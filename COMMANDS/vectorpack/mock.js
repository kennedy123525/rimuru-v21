module.exports = {
  name: "mock",
  async execute(sock, msg, args) {
    const text = args.join(" ")
    if (!text) return sock.sendMessage(msg.key.remoteJid, { text: "Usage: .mock <text>" })
    const result = text.split("").map((c, i) => i%2===0 ? c.toLowerCase() : c.toUpperCase()).join("")
    sock.sendMessage(msg.key.remoteJid, { text: `😂 *Mock:*\n\n${result}` })
  }
}
