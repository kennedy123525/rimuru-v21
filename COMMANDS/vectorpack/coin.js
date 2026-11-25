module.exports = {
  name: "coin",
  async execute(sock, msg) {
    sock.sendMessage(msg.key.remoteJid, {text: `🪙 *Coin Flip*\n\n${Math.random()<0.5 ? "🪙 HEADS!" : "🪙 TAILS!"}`})
  }
}