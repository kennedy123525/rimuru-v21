module.exports = {
  name: "passcrack",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    const ctx = msg.message?.extendedTextMessage?.contextInfo
    const target = ctx?.participant || sender
    const passes = ["P@ssw0rd123","admin2024!","Qwerty@1234","L0gin#2024","s3cur3P@ss"]
    const pass = passes[Math.floor(Math.random()*passes.length)]
    const steps = [
      "🔓 *[PASSWORD CRACKER v3.0]*\n\n🎯 Target: @" + target.split("@")[0] + "\n⏳ Starting dictionary attack...",
      "📚 *Dictionary attack running...*\n\n✅ Common passwords: 10,000 tried\n✅ Variations: 50,000 tried\n⏳ Brute force starting...",
      "⚡ *Brute force attack...*\n\n💻 Attempts: " + Math.floor(Math.random()*9000000+1000000).toLocaleString() + "/sec\n⏳ Cracking hash...",
      "🎯 *HASH CRACKED!*\n\n🔑 Password found: *" + pass + "*\n✅ Access granted to account!",
      "😂😂 *PRANK BRO!* 😂😂\n\n@" + target.split("@")[0] + " your password is safe! 🔒\n\nChange your passwords regularly though fr fr! 😅\n\n_Powered by VECTOR MD_ 🤖"
    ]
    const delays = [2000, 3000, 3500, 4000, 8000]
    for (let i = 0; i < steps.length; i++) {
      await new Promise(r => setTimeout(r, delays[i]))
      await sock.sendMessage(jid, { text: steps[i], mentions: [target] })
    }
  }
}
