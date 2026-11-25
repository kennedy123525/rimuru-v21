module.exports = {
  name: "decode",
  async execute(sock, msg, args) {
    const text = args.join(" ")
    if (!text) return sock.sendMessage(msg.key.remoteJid, { text: "Usage: .decode <base64 text>" })
    try {
      const decoded = Buffer.from(text, "base64").toString("utf8")
      sock.sendMessage(msg.key.remoteJid, { text: `🔓 *Base64 Decoded*\n\nEncoded: ${text}\nDecoded: \`${decoded}\`` })
    } catch { sock.sendMessage(msg.key.remoteJid, { text: "❌ Invalid base64 string." }) }
  }
}
