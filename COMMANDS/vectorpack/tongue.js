module.exports = {
  name: "tongue",
  async execute(sock, msg) {
    const twisters = [
      "She sells seashells by the seashore 🐚",
      "How much wood would a woodchuck chuck if a woodchuck could chuck wood? 🪵",
      "Peter Piper picked a peck of pickled peppers 🌶️",
      "Red lorry, yellow lorry, red lorry, yellow lorry 🚛",
      "Betty Botter bought some butter, but the butter Betty bought was bitter 🧈",
      "I scream, you scream, we all scream for ice cream! 🍦",
      "Unique New York, unique New York, you know you need unique New York 🗽",
    ]
    sock.sendMessage(msg.key.remoteJid, { text: `👅 *Tongue Twister*\n\n${twisters[Math.floor(Math.random()*twisters.length)]}\n\nSay it 5 times fast! 😂` })
  }
}
