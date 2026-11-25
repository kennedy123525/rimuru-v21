module.exports = {
  name: "encode",
  async execute(sock, msg, args) {
    const text = args.join(" ")
    if (!text) return sock.sendMessage(msg.key.remoteJid, { text: "Usage: .encode <text>" })
    const encoded = Buffer.from(text).toString("base64")
    sock.sendMessage(msg.key.remoteJid, { text: `🔐 *Base64 Encoded*\n\nOriginal: ${text}\nEncoded: \`${encoded}\`` })
  }
}
