module.exports = {
  name: "cipher",
  async execute(sock, msg, args) {
    const jid  = msg.key.remoteJid
    if (args.length < 3) {
      return sock.sendMessage(jid, {
        text: "🔐 *Caesar Cipher*\n\nUsage: .cipher <encode|decode> <shift> <text>\n\nExample:\n.cipher encode 3 hello world\n.cipher decode 3 khoor zruog"
      })
    }
    const mode  = args[0].toLowerCase()
    const shift = parseInt(args[1]) % 26
    const text  = args.slice(2).join(" ")
    const s     = mode === "decode" ? (26 - shift) % 26 : shift
    const result = text.split("").map(c => {
      if (/[a-z]/.test(c)) return String.fromCharCode(((c.charCodeAt(0) - 97 + s) % 26) + 97)
      if (/[A-Z]/.test(c)) return String.fromCharCode(((c.charCodeAt(0) - 65 + s) % 26) + 65)
      return c
    }).join("")
    sock.sendMessage(jid, {
      text: "🔐 *Caesar Cipher*\n\n" +
            "Mode: " + mode.toUpperCase() + " (shift " + shift + ")\n\n" +
            "📝 Input:\n" + text + "\n\n" +
            "🔄 Output:\n*" + result + "*"
    })
  }
}
