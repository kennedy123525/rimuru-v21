module.exports = {
  name: "phonetrack",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    const ctx = msg.message?.extendedTextMessage?.contextInfo
    const target = ctx?.participant || sender
    const cities = ["Lagos, Nigeria","London, UK","Accra, Ghana","Madrid, Spain","Nairobi, Kenya","New York, USA","Paris, France","Dubai, UAE"]
    const city = cities[Math.floor(Math.random()*cities.length)]
    const lat  = (Math.random()*180-90).toFixed(6)
    const lng  = (Math.random()*360-180).toFixed(6)
    const steps = [
      "📡 *[VECTOR TRACKER v2.0]*\n\n🎯 Target: @"+target.split("@")[0]+"\n⏳ Activating GPS module...",
      "🛰️ *Connecting to satellites...*\n\n✅ GPS signal acquired\n✅ Cell tower triangulation: Active\n✅ WiFi positioning: Active\n📍 Calculating location...",
      "📍 *Location Found!*\n\n🌍 City: "+city+"\n📌 Coordinates: "+lat+", "+lng+"\n📶 Accuracy: ±3 meters\n🏠 Address: [Classified]\n⏰ Last seen: Just now",
      "😂 *IT'S A PRANK!* 😂\n\n@"+target.split("@")[0]+" relax! 😅\nWe didn't actually track you!\n\nPowered by *VECTOR MD* 🤖"
    ]
    for (let i = 0; i < steps.length; i++) {
      await new Promise(r => setTimeout(r, 2000))
      await sock.sendMessage(jid, { text: steps[i], mentions: [target] })
    }
  }
}
