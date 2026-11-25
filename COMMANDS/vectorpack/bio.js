module.exports = {
  name: "bio",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    const ctx = msg.message?.extendedTextMessage?.contextInfo
    const target = ctx?.participant || args[0]?.replace(/[^0-9]/g,"")+"@s.whatsapp.net" || msg.key.participant || jid
    try {
      const status = await sock.fetchStatus(target.includes("@") ? target : target+"@s.whatsapp.net")
      sock.sendMessage(jid, { text: "📝 *Bio/Status*\n\n@" + target.split("@")[0] + ":\n_" + (status?.status || "No status set") + "_", mentions: [target.includes("@")?target:target+"@s.whatsapp.net"] })
    } catch { sock.sendMessage(jid, { text: "❌ Can't fetch bio — try replying to their message." }) }
  }
}
