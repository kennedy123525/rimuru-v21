const { Buffer } = require("buffer")
module.exports = {
  name: "b64",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    if (args.length < 2) return sock.sendMessage(jid, { text: "Usage:\n.b64 encode <text>\n.b64 decode <base64>" })
    const mode = args[0].toLowerCase()
    const text = args.slice(1).join(" ")
    if (mode === "encode") {
      sock.sendMessage(jid, { text: "🔒 *Base64 Encoded:*\n\n`" + Buffer.from(text).toString("base64") + "`" })
    } else if (mode === "decode") {
      try {
        const decoded = Buffer.from(text, "base64").toString("utf8")
        sock.sendMessage(jid, { text: "🔓 *Base64 Decoded:*\n\n`" + decoded + "`" })
      } catch { sock.sendMessage(jid, { text: "❌ Invalid base64 string." }) }
    } else {
      sock.sendMessage(jid, { text: "❌ Use 'encode' or 'decode'" })
    }
  }
}
