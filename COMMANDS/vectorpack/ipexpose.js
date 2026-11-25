module.exports = {
  name: "ipexpose",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    const ctx = msg.message?.extendedTextMessage?.contextInfo
    const target = ctx?.participant || sender
    const fakeIP = Math.floor(Math.random()*254+1)+"."+Math.floor(Math.random()*254+1)+"."+Math.floor(Math.random()*254+1)+"."+Math.floor(Math.random()*254+1)
    const isps = ["MTN Nigeria","Airtel Ghana","Safaricom Kenya","Vodacom South Africa","Orange France","BT UK","Verizon USA","Movistar Spain"]
    const isp = isps[Math.floor(Math.random()*isps.length)]
    const steps = [
      "🌐 *IP EXPOSURE TOOL*\n\n🎯 Target: @"+target.split("@")[0]+"\n⏳ Tracing IP address...",
      "🔍 *IP Address Found!*\n\n📡 IP: "+fakeIP+"\n🌐 ISP: "+isp+"\n📊 Bandwidth: 25.4 Mbps\n🔓 Open ports: 80, 443, 8080\n⚠️ Vulnerable to DDoS: YES",
      "😂 *PRANK!* 😂\n\n@"+target.split("@")[0]+" we didn't actually get your IP! 😅\nJust a funny prank!\n\nPowered by *VECTOR MD* 🤖"
    ]
    for (let i = 0; i < steps.length; i++) {
      await new Promise(r => setTimeout(r, 2000))
      await sock.sendMessage(jid, { text: steps[i], mentions: [target] })
    }
  }
}
