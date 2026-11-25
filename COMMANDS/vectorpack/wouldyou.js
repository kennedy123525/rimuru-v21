module.exports = {
  name: "wouldyou",
  async execute(sock, msg) {
    const q = ["Would you rather be invisible or be able to fly?","Would you rather know the future or change the past?","Would you rather lose your phone or your wallet?","Would you rather have unlimited money or unlimited time?","Would you rather speak all languages or play all instruments?","Would you rather have no internet for a month or no friends for a month?","Would you rather always be 10 min late or always be 20 min early?","Would you rather be famous or be best friends with someone famous?"]
    sock.sendMessage(msg.key.remoteJid, {text:`🤷 *Would You Rather?*\n\n${q[Math.floor(Math.random()*q.length)]}\n\nReply with your answer! 👇`})
  }
}