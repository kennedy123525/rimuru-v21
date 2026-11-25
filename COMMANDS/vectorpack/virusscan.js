module.exports = {
  name: "virusscan",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid
    const viruses = ["Trojan.GenericKD","Ransom.WannaCry.B","Backdoor.Remcos","Spyware.AgentTesla","Rootkit.BlackMoon"]
    const steps = [
      "🔍 *[VECTOR ANTIVIRUS v5.0]*\n\n⏳ Scanning device...",
      "📊 *Scan Progress*\n\n✅ System files: Clean\n✅ Apps: Scanning...\n⏳ 47% complete",
      "⚠️ *THREAT DETECTED!*\n\n🦠 Found: *" + viruses[Math.floor(Math.random()*viruses.length)] + "*\n📍 Location: /data/user/0/\n💀 Severity: CRITICAL",
      "🔴 *WARNING: Multiple threats!*\n\n🦠 "+Math.floor(Math.random()*12+3)+" viruses found\n📱 Accessing your camera: YES\n📍 Tracking location: YES\n💬 Reading messages: YES\n⚠️ Your data is being stolen RIGHT NOW!",
      "😂 *RELAX! IT'S A PRANK!* 😂\n\nYour phone is totally clean! 🔒\n\nNo viruses, no hacking — just fun! 🤣\n\n_Powered by VECTOR MD 🤖_"
    ]
    for (let i = 0; i < steps.length; i++) {
      await new Promise(r => setTimeout(r, 2000 + i*500))
      await sock.sendMessage(jid, { text: steps[i] })
    }
  }
}
