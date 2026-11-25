module.exports = {
  name: "truth",
  async execute(sock, msg) {
    const t = ["What is the most embarrassing thing you've ever done?","What is your biggest fear?","Have you ever lied to your best friend?","What is the most childish thing you still do?","Have you ever cheated on a test?","What is your biggest regret?","Do you have a crush on anyone right now?","What is the most selfish thing you've ever done?","What's the biggest lie you've ever told?","What is your most embarrassing moment?"]
    sock.sendMessage(msg.key.remoteJid, {text:`🎭 *Truth*\n\n${t[Math.floor(Math.random()*t.length)]}`})
  }
}