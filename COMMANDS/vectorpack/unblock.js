module.exports = {
  name: "unblock",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    const num = args[0]?.replace(/[^0-9]/g,"")
    if (!num) return sock.sendMessage(jid, { text: "Usage: .unblock <number>" })
    try {
      await sock.updateBlockStatus(num+"@s.whatsapp.net", "unblock")
      sock.sendMessage(jid, { text: "✅ User unblocked." })
    } catch { sock.sendMessage(jid, { text: "❌ Failed." }) }
  }
}
