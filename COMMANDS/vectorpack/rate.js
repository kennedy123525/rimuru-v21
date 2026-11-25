module.exports = {
  name: "rate",
  async execute(sock, msg, args) {
    const thing = args.join(" ") || "yourself"
    const rating = (Math.random()*10).toFixed(1)
    const stars = "⭐".repeat(Math.round(rating))
    sock.sendMessage(msg.key.remoteJid, {text:`📊 *Rating: ${thing}*\n\n${stars}\n*${rating} / 10*`})
  }
}