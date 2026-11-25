module.exports = {
  name: "sciencefact",
  async execute(sock, msg) {
    const facts = [
      "⚗️ Water expands when it freezes, which is why ice floats.",
      "🧬 Human DNA is 98.7% identical to chimpanzee DNA.",
      "🧠 The human brain has about 86 billion neurons.",
      "🌡️ Absolute zero (-273.15°C) is the coldest possible temperature.",
      "⚡ Lightning strikes Earth about 8 million times per day.",
      "🔬 A single teaspoon of soil contains more microorganisms than people on Earth.",
      "🌊 The ocean covers 71% of Earth's surface but 95% is unexplored.",
      "💨 The speed of sound is about 343 meters per second at sea level.",
      "☢️ Bananas are slightly radioactive due to potassium-40.",
      "🦟 A mosquito has 47 teeth.",
    ]
    sock.sendMessage(msg.key.remoteJid, { text: "🔬 *Science Fact*\n\n" + facts[Math.floor(Math.random()*facts.length)] })
  }
}
