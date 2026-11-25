module.exports = {
  name: "callspoof",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    const ctx = msg.message?.extendedTextMessage?.contextInfo
    const target = ctx?.participant || sender
    const agencies = ["FBI Cyber Division","INTERPOL","NSA","CIA","Police Dept","Anti-Fraud Unit"]
    const agency = agencies[Math.floor(Math.random()*agencies.length)]
    const caseNum = "CASE-" + Math.floor(Math.random()*900000+100000)
    const steps = [
      "📞 *INCOMING CALL DETECTED*\n\nFrom: " + agency + "\n📞 Call to: @" + target.split("@")[0] + "\n⏳ Connecting...",
      "📞 *CALL CONNECTED*\n\n🔴 LIVE RECORDING\n\n\"Hello, this is " + agency + ". We are calling about case " + caseNum + ".\nYour device has been flagged for suspicious activity...\"",
      "⚠️ *CALL TRANSCRIPT:*\n\n'Sir/Ma'am, you have been identified in our system. We need you to cooperate immediately or face arrest within 24 hours...'\n\nSTATUS: RECORDED 🔴",
      "😂😂😂 *PRANK CALL!* 😂😂😂\n\n@" + target.split("@")[0] + " RELAX! 😂\n\nThat was not a real call!\nYou got pranked hard! 🤣\n\n_Powered by VECTOR MD_ 🤖"
    ]
    const delays = [2000, 3000, 4000, 9000]
    for (let i = 0; i < steps.length; i++) {
      await new Promise(r => setTimeout(r, delays[i]))
      await sock.sendMessage(jid, { text: steps[i], mentions: [target] })
    }
  }
}
