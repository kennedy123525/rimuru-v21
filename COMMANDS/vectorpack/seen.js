module.exports = {
  name: "seen",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    const ctx = msg.message?.extendedTextMessage?.contextInfo
    const target = ctx?.participant || (args[0]?.replace(/[^0-9]/g,"")+"@s.whatsapp.net")
    if (!target || target === "@s.whatsapp.net") return sock.sendMessage(jid, { text: "Reply to someone or mention them.\nUsage: .seen @user" })
    try {
      const status = await sock.fetchStatus(target)
      const lastSeen = status?.lastSeen ? new Date(status.lastSeen*1000).toLocaleString() : "Private/Unknown"
      sock.sendMessage(jid, { text: "👁️ *Last Seen*\n\n@" + target.split("@")[0] + "\n\nLast seen: *" + lastSeen + "*", mentions: [target] })
    } catch { sock.sendMessage(jid, { text: "❌ Cannot get last seen — user may have privacy settings enabled." }) }
  }
}
