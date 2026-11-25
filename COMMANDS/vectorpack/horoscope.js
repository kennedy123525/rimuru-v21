module.exports = {
  name: "horoscope",
  async execute(sock, msg, args) {
    const sign = args[0]?.toLowerCase()
    const signs = {
      aries: "♈ *Aries* — Today favors bold moves. Trust your instincts and take that leap of faith. 🔥",
      taurus: "♉ *Taurus* — Patience is your superpower today. Good things are coming your way. 🌿",
      gemini: "♊ *Gemini* — Your communication skills shine today. Reach out to old friends. 💬",
      cancer: "♋ *Cancer* — Focus on self-care today. Your emotional intelligence is your strength. 🌊",
      leo: "♌ *Leo* — The spotlight is yours today. Step up and show the world your greatness. 👑",
      virgo: "♍ *Virgo* — Details matter today. Your analytical mind will solve a big problem. 🔍",
      libra: "♎ *Libra* — Seek balance in all things today. A compromise leads to happiness. ⚖️",
      scorpio: "♏ *Scorpio* — Your intuition is sharp today. Trust your gut feelings completely. 🦂",
      sagittarius: "♐ *Sagittarius* — Adventure calls! Today is perfect for trying something new. 🏹",
      capricorn: "♑ *Capricorn* — Hard work pays off today. Your dedication will be noticed. 🏔️",
      aquarius: "♒ *Aquarius* — Innovation is your gift today. Share your unique ideas boldly. 💡",
      pisces: "♓ *Pisces* — Creativity flows freely today. Express yourself through art or music. 🌊",
    }
    if (!sign || !signs[sign]) {
      const list = Object.keys(signs).join(", ")
      return sock.sendMessage(msg.key.remoteJid, { text: `🔮 *Horoscope*\n\nUsage: .horoscope <sign>\n\nSigns: ${list}` })
    }
    sock.sendMessage(msg.key.remoteJid, { text: `🔮 *Daily Horoscope*\n\n${signs[sign]}\n\n_Remember: You make your own destiny! ⭐_` })
  }
}
