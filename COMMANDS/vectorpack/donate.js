module.exports = {
  name: "donate",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid
    await sock.sendMessage(jid, {
      text:
        "╔═══════════════════════════╗\n" +
        "║   💎 *SUPPORT VECTOR MD*  ║\n" +
        "╠═══════════════════════════╣\n" +
        "║ 🔥 Enjoyed the bot?\n" +
        "║ Support the dev CHAD FDEV!\n" +
        "╠═══════════════════════════╣\n" +
        "║ 💰 *Donation Methods:*\n" +
        "║\n" +
        "║ 💳 PayPal: contact owner\n" +
        "║ 🟢 Nickel: contact owner\n" +
        "║\n" +
        "║ 📞 Contact: +5491154651401\n" +
        "╠═══════════════════════════╣\n" +
        "║ ❤️ Every bit helps!\n" +
        "║ Thank you for the love!\n" +
        "╚═══════════════════════════╝\n\n" +
        "📢 https://whatsapp.com/channel/0029VbC0opaKGGGFWv4eul2j\n" +
        "_Powered by VECTOR MD_"
    })
  }
}
