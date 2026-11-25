module.exports = {
  name: "historyfact",
  async execute(sock, msg) {
    const facts = [
      "🏛️ Ancient Romans used crushed mouse brains as toothpaste.",
      "⚔️ The shortest war in history lasted 38–45 minutes (Anglo-Zanzibar War, 1896).",
      "🎭 Cleopatra lived closer in time to the Moon landing than to the pyramids being built.",
      "🍕 Pizza was invented in Naples, Italy in the 1800s.",
      "📜 The Great Wall of China took over 2,000 years to build.",
      "🎵 Beethoven was deaf when he composed his 9th Symphony.",
      "🌍 Nigeria gained independence from Britain on October 1, 1960.",
      "✈️ The Wright Brothers' first flight was shorter than a Boeing 747's wingspan.",
      "🔬 Albert Einstein failed his university entrance exam on the first try.",
      "🗽 The Statue of Liberty was a gift from France to the United States.",
    ]
    sock.sendMessage(msg.key.remoteJid, { text: "📜 *History Fact*\n\n" + facts[Math.floor(Math.random()*facts.length)] })
  }
}
