module.exports = {
  name: "wordcount",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    const text = args.join(" ")
    if (!text) return sock.sendMessage(jid, { text: "Usage: .wordcount <text>" })
    const words = text.trim().split(/\s+/).length
    const chars = text.length
    const charsNoSpace = text.replace(/\s/g, "").length
    const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length
    sock.sendMessage(jid, { text: "📝 *Word Count*\n\nWords: *" + words + "*\nCharacters: *" + chars + "*\nChars (no spaces): *" + charsNoSpace + "*\nSentences: *" + sentences + "*" })
  }
}
