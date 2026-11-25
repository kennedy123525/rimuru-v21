module.exports = {
  name: "abbreviate",
  async execute(sock, msg, args) {
    const text = args.join(" ")
    if (!text) return sock.sendMessage(msg.key.remoteJid, { text: "Usage: .abbreviate <phrase>" })
    const abbr = text.split(" ").map(w => w[0]?.toUpperCase()).filter(Boolean).join("")
    sock.sendMessage(msg.key.remoteJid, { text: "✂️ *Abbreviation*\n\n" + text + "\n→ *" + abbr + "*" })
  }
}
