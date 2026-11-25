module.exports = {
  name: "pinsult",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    const target = args.join(" ") || "@" + sender.split("@")[0]
    const insults = [
      "Your head be like satellite dish wey dem abandon for bush.",
      "You dull pass the student wey sleep through exam and still fail.",
      "You be the kind person wey go ask 'how far' when dem tell you say person die.",
      "Your brain small reach groundnut — no be insult, na fact.",
      "You ugly reach Monday morning, nobody happy to see you.",
      "Even your shadow dey ashamed to follow you.",
      "You be the definition of useless — dictionary go use your picture.",
      "Na you make people pray say 'God please no make me like dis person'.",
      "Your village people don send you on assignment and you don't even know.",
      "You sabi nonsense pass professor — you study am so well.",
      "If foolishness be commodity, you go be billionaire.",
      "Your destiny blur reach NEPA bill — nobody fit read am.",
      "You dey behave like generator wey no get fuel — a lot of noise, zero sense.",
      "Your brain on vacation since 1995 and e never come back.",
      "You get the energy of a tortoise on Monday morning wey no chop.",
    ]
    const i = insults[Math.floor(Math.random() * insults.length)]
    await sock.sendMessage(jid, { text: "😂 *Pidgin Insult for " + target + "*\n\n" + i })
  }
}
