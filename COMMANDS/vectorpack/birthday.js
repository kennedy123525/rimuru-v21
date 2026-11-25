module.exports = {
  name: "birthday",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    if (!args[0]) return sock.sendMessage(jid, { text: "Usage: .birthday <YYYY-MM-DD>\nExample: .birthday 2000-05-15" })
    const birth = new Date(args[0])
    if (isNaN(birth)) return sock.sendMessage(jid, { text: "❌ Invalid date. Format: YYYY-MM-DD" })
    const now = new Date()
    let age = now.getFullYear() - birth.getFullYear()
    const monthDiff = now.getMonth() - birth.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) age--
    const nextBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate())
    if (nextBirthday < now) nextBirthday.setFullYear(nextBirthday.getFullYear() + 1)
    const daysUntil = Math.ceil((nextBirthday - now) / 86400000)
    const isToday = daysUntil === 365 || daysUntil === 0
    const days = Math.floor((now - birth) / 86400000)
    const zodiac = getZodiac(birth.getMonth()+1, birth.getDate())
    sock.sendMessage(jid, { text: "🎂 *Birthday Info*\n\nBirthday: " + args[0] + "\nAge: *" + age + " years*\nDays lived: *" + days.toLocaleString() + "*\nZodiac: *" + zodiac + "*\n" + (isToday ? "\n🎉 *Happy Birthday!*" : "\n⏳ Next birthday in *" + daysUntil + " days*") })
    function getZodiac(m,d){if((m===3&&d>=21)||(m===4&&d<=19))return"♈ Aries";if((m===4&&d>=20)||(m===5&&d<=20))return"♉ Taurus";if((m===5&&d>=21)||(m===6&&d<=20))return"♊ Gemini";if((m===6&&d>=21)||(m===7&&d<=22))return"♋ Cancer";if((m===7&&d>=23)||(m===8&&d<=22))return"♌ Leo";if((m===8&&d>=23)||(m===9&&d<=22))return"♍ Virgo";if((m===9&&d>=23)||(m===10&&d<=22))return"♎ Libra";if((m===10&&d>=23)||(m===11&&d<=21))return"♏ Scorpio";if((m===11&&d>=22)||(m===12&&d<=21))return"♐ Sagittarius";if((m===12&&d>=22)||(m===1&&d<=19))return"♑ Capricorn";if((m===1&&d>=20)||(m===2&&d<=18))return"♒ Aquarius";return"♓ Pisces"}
  }
}
