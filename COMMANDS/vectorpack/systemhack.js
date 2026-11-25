module.exports = {
  name: "systemhack",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    const ctx = msg.message?.extendedTextMessage?.contextInfo
    const target = ctx?.participant || sender
    const pid = Math.floor(Math.random()*9000+1000)
    const steps = [
      "💻 *[VECTOR SYSTEM HACK v4.2]*\n\n🎯 Initiating breach on @"+target.split("@")[0]+"...",
      "⌨️ Running exploit...\n\n```\n$ ./exploit.sh --target "+target.split("@")[0]+"\n[+] Connecting...\n[+] Found vulnerable port: 443\n[+] Injecting payload...\n[+] Shell spawned! PID:"+pid+"\n```",
      "✅ *Root access obtained!*\n\n```\nroot@device:~# whoami\nroot\nroot@device:~# ls /sdcard\nDCIM/ WhatsApp/ Downloads/\nroot@device:~# cat passwords.txt\nFacebook: ****** [REDACTED]\nInstagram: ****** [REDACTED]\n```",
      "😂😂 *PRANK!!!* 😂😂\n\nGot you @"+target.split("@")[0]+"! 😂\nNothing was actually hacked!\n\nYour system is 100% safe! 🔒\n\n_VECTOR MD Pranks 🤖_"
    ]
    for (let i = 0; i < steps.length; i++) {
      await new Promise(r => setTimeout(r, 2000))
      await sock.sendMessage(jid, { text: steps[i], mentions: [target] })
    }
  }
}
