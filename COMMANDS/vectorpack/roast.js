module.exports = {
  name: "roast",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    const target = args.join(" ") || "@" + sender.split("@")[0]
    const roasts = [
      "You're so irrelevant, even your own shadow clocks out early.",
      "The doctor looked at your brain scan and started crying — from laughter.",
      "You're not the dumbest person on earth, but you better pray that person never dies.",
      "Even your parents' WiFi has a stronger connection than you have with reality.",
      "You have the charisma of a tax return and the humor of a dental appointment.",
      "Your life story would make a great cautionary tale — just not a great story.",
      "I've seen more purpose in a decorative gourd than I see in your entire existence.",
      "You're like a participation award — technically involved, utterly forgettable.",
      "The only thing sharp about you is your smell on a hot day.",
      "If you were any more basic, you'd be a kindergarten math problem.",
      "You're the kind of person that brings a spoon to a sword fight — confidently wrong.",
      "Scientists use you as evidence that evolution is reversible.",
      "You're the human version of a loading screen — everyone hates waiting for you.",
      "I'd say you peaked, but even that would be giving your mediocrity too much credit.",
      "Your personality is so flat they use it to calibrate spirit levels.",
    ]
    const r = roasts[Math.floor(Math.random() * roasts.length)]
    await sock.sendMessage(jid, { text: "🔥 *Roasting " + target + "*\n\n" + r })
  }
}
