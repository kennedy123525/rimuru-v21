module.exports = {
  name: "zodiac",
  async execute(sock, msg, args) {
    const sign = args[0]?.toLowerCase()
    const data = {
      aries: { dates:"Mar 21–Apr 19", emoji:"♈", traits:"Bold, ambitious, confident", lucky:"Red, 9, Tuesday" },
      taurus: { dates:"Apr 20–May 20", emoji:"♉", traits:"Reliable, patient, practical", lucky:"Green, 6, Friday" },
      gemini: { dates:"May 21–Jun 20", emoji:"♊", traits:"Adaptable, curious, communicative", lucky:"Yellow, 3, Wednesday" },
      cancer: { dates:"Jun 21–Jul 22", emoji:"♋", traits:"Intuitive, emotional, protective", lucky:"Silver, 2, Monday" },
      leo: { dates:"Jul 23–Aug 22", emoji:"♌", traits:"Creative, passionate, generous", lucky:"Gold, 1, Sunday" },
      virgo: { dates:"Aug 23–Sep 22", emoji:"♍", traits:"Analytical, hardworking, practical", lucky:"White, 5, Wednesday" },
      libra: { dates:"Sep 23–Oct 22", emoji:"♎", traits:"Diplomatic, fair, social", lucky:"Pink, 6, Friday" },
      scorpio: { dates:"Oct 23–Nov 21", emoji:"♏", traits:"Resourceful, brave, passionate", lucky:"Black, 8, Tuesday" },
      sagittarius: { dates:"Nov 22–Dec 21", emoji:"♐", traits:"Generous, idealistic, adventurous", lucky:"Purple, 3, Thursday" },
      capricorn: { dates:"Dec 22–Jan 19", emoji:"♑", traits:"Responsible, disciplined, ambitious", lucky:"Brown, 4, Saturday" },
      aquarius: { dates:"Jan 20–Feb 18", emoji:"♒", traits:"Independent, humanitarian, original", lucky:"Blue, 11, Saturday" },
      pisces: { dates:"Feb 19–Mar 20", emoji:"♓", traits:"Compassionate, artistic, intuitive", lucky:"Sea green, 7, Thursday" },
    }
    if (!sign || !data[sign]) return sock.sendMessage(msg.key.remoteJid, { text: "🔮 Usage: .zodiac <sign>\nSigns: " + Object.keys(data).join(", ") })
    const z = data[sign]
    sock.sendMessage(msg.key.remoteJid, { text: z.emoji + " *" + sign.charAt(0).toUpperCase()+sign.slice(1) + "*\n\n📅 Dates: " + z.dates + "\n✨ Traits: " + z.traits + "\n🍀 Lucky: " + z.lucky })
  }
}
