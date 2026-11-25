module.exports = {
  name: "choose",
  async execute(sock, msg, args) {
    const options = args.join(" ").split("|").map(o => o.trim()).filter(Boolean)
    if (options.length < 2) return sock.sendMessage(msg.key.remoteJid, { text: "Usage: .choose <option1> | <option2> | <option3>\nExample: .choose pizza | burger | sushi" })
    const chosen = options[Math.floor(Math.random()*options.length)]
    sock.sendMessage(msg.key.remoteJid, { text: `🎲 *Random Choice*\n\nOptions: ${options.join(", ")}\n\n✅ I choose: *${chosen}*` })
  }
}
