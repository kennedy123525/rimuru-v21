module.exports = {
  name: "wyr",
  async execute(sock, msg) {
    const q = [
      "Would you rather have the ability to fly ✈️ or be invisible 👻?",
      "Would you rather always be hot 🥵 or always be cold 🥶?",
      "Would you rather eat only pizza 🍕 for life or only sushi 🍣 for life?",
      "Would you rather have a rewind button ⏪ or a pause button ⏸️ in your life?",
      "Would you rather be the smartest person 🧠 or the most attractive person 💅?",
      "Would you rather live without music 🎵 or without movies 🎬?",
      "Would you rather be able to talk to animals 🐶 or speak all languages 🌐?",
      "Would you rather never use social media again 📵 or never watch TV again 📺?",
    ]
    sock.sendMessage(msg.key.remoteJid, { text: `🤷 *Would You Rather?*\n\n${q[Math.floor(Math.random()*q.length)]}\n\nComment your choice! 👇` })
  }
}
