module.exports = {
  name: "spinwheel",
  async execute(sock, msg, args) {
    const options = args.join(" ").split("|").map(o=>o.trim()).filter(Boolean)
    if (options.length < 2) return sock.sendMessage(msg.key.remoteJid, { text: "Usage: .spinwheel option1 | option2 | option3\nExample: .spinwheel pizza | burger | sushi | tacos" })
    const chosen = options[Math.floor(Math.random()*options.length)]
    sock.sendMessage(msg.key.remoteJid, { text: "🎡 *Spin the Wheel!*\n\nOptions: " + options.join(" • ") + "\n\n🎯 Result: *" + chosen + "*" })
  }
}
