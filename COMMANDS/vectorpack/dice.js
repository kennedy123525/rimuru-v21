module.exports = {
  name: "dice",
  async execute(sock, msg) {
    let num = Math.floor(Math.random() * 6) + 1
    sock.sendMessage(msg.key.remoteJid, { text: `🎲 ${num}` })
  }
}