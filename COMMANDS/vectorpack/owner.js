module.exports = {
  name: "owner",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid
    const cfg = require("../../lib/vconfig")
    await sock.sendMessage(jid, {
      text:
        "╔════════════════════════╗\n" +
        "║   👑 *BOT OWNER INFO*   ║\n" +
        "╠════════════════════════╣\n" +
        "║ 👤 Name: *" + cfg.ownerName + "*\n" +
        "║ 📞 Number: *+" + cfg.ownerNumber + "*\n" +
        "║ 🤖 Bot: *VECTOR MD v2.0*\n" +
        "║ 🛠️ Dev: *CHAD FDEV*\n" +
        "╠════════════════════════╣\n" +
        "║ 📢 Channel:\n" +
        "║ https://whatsapp.com/\n" +
        "║ channel/0029VbC0opaKGGG\n" +
        "║ FWv4eul2j\n" +
        "╚════════════════════════╝\n\n" +
        "🔥 _Greatest dev of all time!_ 👑\n" +
        "_Powered by VECTOR MD_"
    })
  }
}
