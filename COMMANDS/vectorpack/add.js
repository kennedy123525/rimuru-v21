module.exports = {
  name: "add",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    if (!jid.endsWith("@g.us")) return sock.sendMessage(jid, { text: "❌ Groups only!" })
    const num = args[0]?.replace(/[^0-9]/g,"")
    if (!num) return sock.sendMessage(jid, { text: "Usage: .add <number>\nExample: .add 2349012345678" })
    try {
      await sock.groupParticipantsUpdate(jid, [num+"@s.whatsapp.net"], "add")
      sock.sendMessage(jid, { text: `✅ +${num} added to the group!` })
    } catch { sock.sendMessage(jid, { text: "❌ Couldn't add. They may have privacy settings enabled." }) }
  }
}
