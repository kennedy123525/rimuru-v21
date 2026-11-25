module.exports = {
  name: "getpp",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    const quoted = msg.message?.extendedTextMessage?.contextInfo?.participant
    const target = quoted || sender
    try {
      const url = await sock.profilePictureUrl(target, "image")
      await sock.sendMessage(jid, { image: { url }, caption: "🖼️ Profile Picture of @" + target.split("@")[0], mentions: [target] })
    } catch { sock.sendMessage(jid, { text: "❌ No profile picture found. It may be private." }) }
  }
}
