module.exports = {
  name: "funfact",
  async execute(sock, msg) {
    const facts = ["Honey never expires — 3000-year-old honey was found in Egyptian tombs! 🍯","A group of flamingos is called a 'flamboyance' 🦩","Octopuses have three hearts and blue blood 🐙","Bananas are technically berries, but strawberries aren't 🍌","A day on Venus is longer than a year on Venus ☀️","Wombat poop is cube-shaped 📦","Cleopatra lived closer to the Moon landing than to the pyramids being built 🌙","The fingerprints of a koala are nearly identical to humans 🐨"]
    sock.sendMessage(msg.key.remoteJid, {text:`🤯 *Fun Fact*\n\n${facts[Math.floor(Math.random()*facts.length)]}`})
  }
}