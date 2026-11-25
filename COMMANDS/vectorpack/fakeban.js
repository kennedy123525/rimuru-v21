module.exports = {
  name: "fakeban",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    const ctx = msg.message?.extendedTextMessage?.contextInfo
    const target = ctx?.participant || sender
    const steps = [
      "⚠️ *WhatsApp System Alert*\n\nAccount @"+target.split("@")[0]+" has been flagged for violation.",
      "🔴 *ACCOUNT SUSPENSION NOTICE*\n\n📋 Violations detected:\n• Spam activity (127 reports)\n• Suspicious messaging patterns\n• TOS violation section 4.2.1\n\n⏳ Processing ban...",
      "❌ *ACCOUNT BANNED*\n\n+"+target.split("@")[0]+" has been permanently banned from WhatsApp.\n\nBan ID: WA-"+Math.floor(Math.random()*999999)+"\n⏰ Effective: Immediately",
      "😂😂 *PRANK!* 😂😂\n\n@"+target.split("@")[0]+" you're not banned! 😅\n\nYou just got pranked by VECTOR MD 🤖",
    ]
    for (let i = 0; i < steps.length; i++) {
      await new Promise(r => setTimeout(r, 2500))
      await sock.sendMessage(jid, { text: steps[i], mentions: [target] })
    }
  }
}
