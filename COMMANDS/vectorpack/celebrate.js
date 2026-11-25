module.exports = {
  name: "celebrate",
  async execute(sock, msg, args) {
    const reason = args.join(" ") || "something amazing"
    const celeb = [
      "🎉🎊🥳 *Let's celebrate " + reason + "!*\n\n🎆🎇✨ WOOHOO! This calls for a party! 🎂🍾🎈",
      "🥳 *Celebrating " + reason + "!*\n\n🎉 Pop the confetti! 🎊 Let's go! 🔥",
      "🎊 *" + reason + " deserves a celebration!*\n\n🎉🥂 Here's to you! Cheers! 🥳✨",
    ]
    sock.sendMessage(msg.key.remoteJid, { text: celeb[Math.floor(Math.random()*celeb.length)] })
  }
}
