module.exports = {
  name: "hackdevice",
  async execute(sock, msg, args, sender) {
    const jid    = msg.key.remoteJid
    const ctx    = msg.message?.extendedTextMessage?.contextInfo
    const target = ctx?.participant || (args[0]?.replace(/\D/g,"")+"@s.whatsapp.net") || sender

    // Random device details each time
    const devices   = ["Samsung Galaxy S25 Ultra","iPhone 16 Pro Max","Google Pixel 9 Pro","Xiaomi 14 Ultra","OnePlus 13","Huawei Mate 60 Pro","Motorola Edge 50","Realme GT 6"]
    const countries = ["Nigeria 🇳🇬","Ghana 🇬🇭","South Africa 🇿🇦","Kenya 🇰🇪","UK 🇬🇧","USA 🇺🇸","Brazil 🇧🇷","Spain 🇪🇸","Germany 🇩🇪","France 🇫🇷"]
    const cities    = ["Lagos","Accra","Cape Town","Nairobi","London","New York","São Paulo","Madrid","Berlin","Paris"]
    const oses      = ["Android 15","Android 14","iOS 18.3","iOS 17.5","Android 13","HarmonyOS 4","MIUI 15"]

    const dev     = devices[Math.floor(Math.random()*devices.length)]
    const country = countries[Math.floor(Math.random()*countries.length)]
    const city    = cities[Math.floor(Math.random()*cities.length)]
    const os      = oses[Math.floor(Math.random()*oses.length)]
    const ip      = Math.floor(Math.random()*255)+"."+Math.floor(Math.random()*255)+"."+Math.floor(Math.random()*255)+"."+Math.floor(Math.random()*255)
    const imei    = Array.from({length:15},()=>Math.floor(Math.random()*9)).join("")
    const calls   = Math.floor(Math.random()*500)+100
    const msgs    = Math.floor(Math.random()*5000)+500
    const photos  = Math.floor(Math.random()*3000)+200
    const bank    = ["GTB","Access","Opay","Palmpay","Zenith","UBA","First Bank"][Math.floor(Math.random()*7)]
    const pass    = "*".repeat(4)+Math.floor(Math.random()*9999)

    const steps = [
      "🔓 *[VECTOR HACK TOOL v3.0]*\n\n🎯 Target: @" + target.split("@")[0] + "\n⏳ Initializing breach...",
      "📡 *Scanning device...*\n\n📱 Device: " + dev + "\n💻 OS: " + os + "\n🌐 IP: " + ip + "\n📍 Location: " + city + ", " + country,
      "🔐 *Bypassing security layers...*\n\n✅ Firewall: BYPASSED\n✅ VPN: BYPASSED\n✅ 2FA: CRACKED\n⏳ IMEI: " + imei,
      "💾 *Accessing device storage...*\n\n📂 Gallery: ████████░░ 80%\n📂 Messages: ██████████ 100%\n📂 Contacts: ███████░░░ 70%\n📂 Banking: ████░░░░░░ 40%",
      "📲 *Extracting sensitive data...*\n\n📞 Call logs: " + calls + " records found\n💬 Messages: " + msgs + " chats extracted\n📸 Photos: " + photos + " images\n📍 GPS history: 847 locations",
      "🔑 *Cracking passwords...*\n\n✅ WhatsApp: r*****3\n✅ Instagram: f*****5\n✅ " + bank + " App: " + pass + "\n⚠️ Uploading all data to remote server...",
      "💥 *SYSTEM COMPROMISED*\n\n⚠️ Device fully hacked!\n📤 All data uploaded to server\n🔐 Remote access: GRANTED\n💣 Self-destruct sequence in 3... 2... 1...",
      "😂😂😂 *IT'S A PRANK!* 😂😂😂\n\nRelax @" + target.split("@")[0] + "! 😅\nYour device is perfectly safe! 🔒\n\nNothing was actually hacked!\nPowered by *VECTOR MD* 🤖"
    ]
    const delays = [1500, 2500, 3000, 3500, 3000, 3500, 5000, 8000]
    for (let i = 0; i < steps.length; i++) {
      await new Promise(r => setTimeout(r, delays[i]))
      await sock.sendMessage(jid, { text: steps[i], mentions: [target] })
    }
  }
}
