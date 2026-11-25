module.exports = {
  name: "setsauthor",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    const name = args.join(" ").trim()
    if (!name) {
      return sock.sendMessage(jid, {
        text: "📌 *Usage:* .setsauthor <name>\n\n" +
              "Example: .setsauthor CHAD FDEV\n\n" +
              "Current author: *" + (global.stickerAuthor || "CHAD FDEV") + "*"
      })
    }
    global.stickerAuthor = name
    await sock.sendMessage(jid, {
      text: "✅ *Sticker author updated!*\n\n" +
            "👤 Author: *" + name + "*\n" +
            "📦 Pack: *VECTOR MD*\n\n" +
            "Now use .sticker or .take — your sticker info will show:\n" +
            "*" + name + " · VECTOR MD*"
    })
  }
}
