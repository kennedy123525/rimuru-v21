module.exports = {
  name: "pickup",
  async execute(sock, msg, args) {
    const lines = [
      "Are you a bank loan? Because you've got my interest. 💰",
      "Do you like raisins? How do you feel about a date? 🍇",
      "Are you a campfire? Because you're hot and I want s'more. 🔥",
      "Is your name Chapstick? Because you're da balm! 💋",
      "Are you a time traveler? Because I see you in my future. ⏰",
      "Do you have a pencil? Cause I want to erase your past and write our future. ✏️",
      "Are you a magician? Every time I look at you everyone else disappears. ✨",
      "Do you play soccer? Because you're a keeper. ⚽",
    ]
    const target = args.join(" ") || "you"
    sock.sendMessage(msg.key.remoteJid, { text: `💝 *Pickup Line for ${target}*\n\n${lines[Math.floor(Math.random()*lines.length)]}` })
  }
}
