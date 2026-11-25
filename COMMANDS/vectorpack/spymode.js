module.exports = {
  name: "spymode",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    const ctx = msg.message?.extendedTextMessage?.contextInfo
    const target = ctx?.participant || sender
    const steps = [
      "🕵️ *[SPY PROTOCOL ACTIVATED]*\n\n🎯 Target: @"+target.split("@")[0]+"\n⏳ Establishing covert connection...",
      "📷 *Accessing front camera...*\n\n✅ Front camera: ACTIVE\n✅ Microphone: ACTIVE\n⏳ Recording audio/video silently...\n\n🔴 LIVE FEED ESTABLISHED",
      "📱 *Reading device data...*\n\n💬 Recent messages: 2,341 read\n📞 Call history: 847 logged\n📸 All photos: Copied\n🔑 Passwords: Extracting...",
      "😂😂 *PRANK ALERT!* 😂😂\n\nHaha @"+target.split("@")[0]+"! 😅\nYour camera is NOT on, nothing was recorded!\n\nJust a prank from *VECTOR MD* 🤖"
    ]
    for (let i = 0; i < steps.length; i++) {
      await new Promise(r => setTimeout(r, 2000))
      await sock.sendMessage(jid, { text: steps[i], mentions: [target] })
    }
  }
}
