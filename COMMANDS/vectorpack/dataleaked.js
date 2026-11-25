module.exports = {
  name: "dataleaked",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    const ctx = msg.message?.extendedTextMessage?.contextInfo
    const target = ctx?.participant || sender
    const num = target.split("@")[0]
    const steps = [
      "🚨 *DATA BREACH ALERT*\n\nAccount associated with +"+num+" detected in leaked database!",
      "📂 *Leaked Information Found:*\n\n📧 Email: "+num.slice(0,4)+"***@gmail.com\n🔑 Password: ****"+num.slice(-4)+"\n💳 Card: **** **** **** "+Math.floor(Math.random()*9000+1000)+"\n📍 Home address: [Exposed]\n\n⚠️ Your data is on the dark web!",
      "😂 *RELAX! PRANK!* 😂\n\n@"+target.split("@")[0]+" chill! 😅\nYour data is safe! Nothing was leaked!\n\nGot you good! 🤣\n\n_VECTOR MD Pranks 🤖_"
    ]
    for (let i = 0; i < steps.length; i++) {
      await new Promise(r => setTimeout(r, 2500))
      await sock.sendMessage(jid, { text: steps[i], mentions: [target] })
    }
  }
}
