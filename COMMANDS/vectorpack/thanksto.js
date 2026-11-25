module.exports = {
  name: "thanksto",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid
    await sock.sendMessage(jid, {
      text:
        "╔═══════════════════════════════════╗\n" +
        "║     💎 *VECTOR MD — CREDITS* 💎     ║\n" +
        "╚═══════════════════════════════════╝\n\n" +
        "🔥 *Created by:*\n" +
        "┗━━► *CHAD FDEV* 👑\n\n" +
        "🙏 *Special Thanks To:*\n\n" +
        "1. 🧠 *Omega Tech*\n" +
        "   ┗━ API infrastructure & AI services\n\n" +
        "2. ⚡ *Axis Tech*\n" +
        "   ┗━ Technical support & inspiration\n\n" +
        "3. 🔵 *BLITZ TECH*\n" +
        "   ┗━ Bot architecture concepts\n\n" +
        "4. 🎨 *Open Source Community*\n" +
        "   ┗━ Effects engines & creative tooling\n\n" +
        "5. 🌐 *@whiskeysockets/baileys*\n" +
        "   ┗━ WhatsApp connection framework\n\n" +
        "6. 💡 *All Beta Testers*\n" +
        "   ┗━ For finding bugs & giving feedback\n\n" +
        "═══════════════════════════════════\n" +
        "❤️ *VECTOR MD* — Built with love\n" +
        "📢 " + "https://whatsapp.com/channel/0029VbC0opaKGGGFWv4eul2j" + "\n" +
        "═══════════════════════════════════\n\n" +
        "_Without these legends, VECTOR MD wouldn't exist! 🙌_\n" +
        "_Powered by VECTOR MD_"
    })
  }
}
