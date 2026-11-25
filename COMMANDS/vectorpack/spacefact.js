module.exports = {
  name: "spacefact",
  async execute(sock, msg) {
    const facts = [
      "🌌 A day on Venus is longer than a year on Venus!",
      "🌙 The Moon is moving away from Earth at about 3.8 cm per year.",
      "☀️ The Sun accounts for 99.86% of the mass in our solar system.",
      "🪐 Saturn's rings are made mostly of ice and rock.",
      "🌟 There are more stars in the universe than grains of sand on Earth.",
      "🚀 Light from the Sun takes about 8 minutes to reach Earth.",
      "🌍 Earth is the only planet not named after a god.",
      "♦️ It rains diamonds on Neptune and Uranus!",
      "🌑 A neutron star is so dense a teaspoon would weigh a billion tons.",
      "🌊 There is a cloud of alcohol in space spanning 463 billion km.",
    ]
    sock.sendMessage(msg.key.remoteJid, { text: facts[Math.floor(Math.random()*facts.length)] })
  }
}
