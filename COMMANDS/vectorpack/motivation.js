module.exports = {
  name: "motivation",
  async execute(sock, msg) {
    const m = [
      "💪 Believe you can and you're halfway there. — Theodore Roosevelt",
      "🌟 It always seems impossible until it's done. — Nelson Mandela",
      "🔥 Don't watch the clock; do what it does. Keep going. — Sam Levenson",
      "⭐ The only way to do great work is to love what you do. — Steve Jobs",
      "🎯 Success is not final, failure is not fatal — it is the courage to continue that counts. — Winston Churchill",
      "🚀 You are never too old to set another goal or to dream a new dream. — C.S. Lewis",
      "💡 The secret of getting ahead is getting started. — Mark Twain",
      "🌈 Keep your face always toward the sunshine and shadows will fall behind you. — Walt Whitman",
    ]
    sock.sendMessage(msg.key.remoteJid, { text: `💪 *Daily Motivation*\n\n${m[Math.floor(Math.random()*m.length)]}` })
  }
}
