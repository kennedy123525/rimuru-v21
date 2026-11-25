module.exports = {
  name: "repeat",
  async execute(sock, msg, args) {
    const jid   = msg.key.remoteJid
    const count = Math.min(Math.max(parseInt(args[0]) || 1, 1), 5000)
    const text  = args.slice(1).join(" ")
    if (!text) return sock.sendMessage(jid, {
      text: "Usage: .repeat <count> <message>\nExample: .repeat 10 hello\nMax: 5000"
    })

    let sent = 0
    const CHUNK = 50 // send 50 at a time to avoid rate limits
    while (sent < count) {
      const batch = Math.min(CHUNK, count - sent)
      const chunk = (text + "\n").repeat(batch).trim()
      await sock.sendMessage(jid, { text: chunk })
      sent += batch
      if (sent < count) await new Promise(r => setTimeout(r, 400))
    }
  }
}
