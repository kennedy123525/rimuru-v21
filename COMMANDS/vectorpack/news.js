module.exports = {
  name: "news",
  async execute(sock, msg, args, sender) {
    const jid     = msg.key.remoteJid
    const CHANNEL = "https://whatsapp.com/channel/0029VbC0opaKGGGFWv4eul2j"
    await sock.sendMessage(jid, {
      text:
        "📢 *VECTOR MD News & Updates*\n\n" +
        "Stay up to date with the latest:\n" +
        "• 🆕 New commands\n" +
        "• 🐛 Bug fixes\n" +
        "• ✨ New features\n" +
        "• 📣 Announcements\n\n" +
        "👇 *Follow our channel:*\n" +
        CHANNEL + "\n\n" +
        "_Tap the link above to open the channel_\n\n" +
        "⚙️ Powered by *CHAD FDEV*",
      contextInfo: {
        externalAdReply: {
          title: "📢 VECTOR MD Official Channel",
          body: "Tap to follow for news & updates!",
          thumbnailUrl: "https://i.imgur.com/4M7IWwP.png",
          sourceUrl: CHANNEL,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    })
  }
}
