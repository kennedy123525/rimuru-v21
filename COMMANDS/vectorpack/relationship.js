module.exports = {
  name: "relationship",
  async execute(sock, msg, args) {
    const types = [
      "👫 You're the *social butterfly* type — everyone loves being around you!",
      "💑 You're the *romantic* type — you love deeply and unconditionally.",
      "🤝 You're the *loyal friend* type — people always count on you.",
      "🧘 You're the *independent* type — you value freedom and space.",
      "🎭 You're the *entertainer* type — you keep every relationship fun!",
      "🛡️ You're the *protector* type — you always look out for your loved ones.",
      "📚 You're the *intellectual* type — deep conversations are your love language.",
    ]
    const name = args.join(" ") || msg.pushName || "You"
    sock.sendMessage(msg.key.remoteJid, { text: "💝 *Relationship Type: " + name + "*\n\n" + types[Math.floor(Math.random()*types.length)] })
  }
}
