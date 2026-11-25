module.exports = {
  name: "binary",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    const input = args.join(" ")
    if (!input) return sock.sendMessage(jid, { text: "Usage: .binary <text or binary>\nExample: .binary Hello\nExample: .binary 01001000 01100101" })
    // If input looks like binary, decode it
    if (/^[01 ]+$/.test(input)) {
      try {
        const text = input.split(" ").map(b => String.fromCharCode(parseInt(b,2))).join("")
        return sock.sendMessage(jid, { text: "🔢 *Binary Decoded:*\n\n" + text })
      } catch {}
    }
    // Else encode to binary
    const binary = input.split("").map(c => c.charCodeAt(0).toString(2).padStart(8,"0")).join(" ")
    sock.sendMessage(jid, { text: "🔢 *Text to Binary:*\n\n" + binary })
  }
}
