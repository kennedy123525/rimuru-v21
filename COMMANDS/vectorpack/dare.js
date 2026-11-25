module.exports = {
  name: "dare",
  async execute(sock, msg) {
    const d = ["Send a voice note of you singing for 10 seconds 🎤","Change your profile picture to something embarrassing for 1 hour 😂","Send a message to your crush right now 💌","Post a status saying 'I still sleep with a nightlight' 🌙","Do 20 push-ups and send proof 💪","Call someone and speak only in song lyrics 🎵","Eat a spoonful of something you hate 🤢","Send a text to your parents saying 'I have something to confess' 😅"]
    sock.sendMessage(msg.key.remoteJid, {text:`🎯 *Dare*\n\n${d[Math.floor(Math.random()*d.length)]}`})
  }
}