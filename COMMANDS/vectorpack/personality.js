module.exports = {
  name: "personality",
  async execute(sock, msg, args) {
    const n = args.join(" ") || msg.pushName || "You"
    const types = [
      { type:"The Visionary 🔭", desc:"You see what others can't. Creative, intuitive, and always thinking ahead.", strength:"Innovation", weakness:"Impatience" },
      { type:"The Leader 👑", desc:"Natural born leader. Confident, decisive and inspiring to others.", strength:"Decision making", weakness:"Stubbornness" },
      { type:"The Nurturer 💝", desc:"Deeply caring and empathetic. You always put others first.", strength:"Empathy", weakness:"Self-neglect" },
      { type:"The Analyzer 🔍", desc:"Detail-oriented and logical. You solve problems methodically.", strength:"Problem solving", weakness:"Overthinking" },
      { type:"The Adventurer 🌟", desc:"Spontaneous, energetic and always ready for something new!", strength:"Adaptability", weakness:"Commitment" },
    ]
    const t = types[Math.floor(Math.random()*types.length)]
    sock.sendMessage(msg.key.remoteJid, { text: "🧠 *Personality Reading for " + n + "*\n\n" + t.type + "\n\n" + t.desc + "\n\n💪 Strength: " + t.strength + "\n⚠️ Weakness: " + t.weakness })
  }
}
