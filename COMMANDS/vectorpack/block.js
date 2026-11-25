module.exports = {
  name: "block",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    const quoted = msg.message?.extendedTextMessage?.contextInfo?.participant
    const target = quoted || (args[0]?.replace(/[^0-9]/g,"")+"@s.whatsapp.net")
    if (!target || target === "@s.whatsapp.net") return sock.sendMessage(jid, { text: "Reply to someone's message to block them." })
    try {
      await sock.updateBlockStatus(target, "block")
      sock.sendMessage(jid, { text: "🚫 User blocked." })
    } catch { sock.sendMessage(jid, { text: "❌ Failed to block." }) }
  }
}
