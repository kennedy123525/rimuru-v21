module.exports = {
  name: "insult",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    const target = args.join(" ") || "@" + sender.split("@")[0]
    const insults = [
      "You're so dumb, you tried to put M&Ms in alphabetical order. 🤦",
      "If brains were petrol, you wouldn't have enough to power an ant's motorbike around the inside of a cheerio.",
      "You're the human equivalent of a participation trophy.",
      "I'd explain it to you but I left my crayons at home.",
      "You're not stupid; you just have bad luck thinking.",
      "I've met rocks with more charisma than you.",
      "You're like a cloud — when you disappear, it's a beautiful day.",
      "You're proof that God has a sense of humor.",
      "Your brain is so small, it gets lost in a thimble.",
      "Calling you an idiot would be an insult to idiots.",
      "You're the reason we can't have nice things.",
      "I'd call you a tool, but even tools are useful.",
      "You're so slow, you'd lose a race to a parked car.",
      "Your IQ is like your shoe size — embarrassingly small.",
      "You're about as useful as a chocolate teapot.",
      "If ignorance is bliss, you must be the happiest person alive.",
      "You're the human equivalent of a broken elevator — you never get to any level.",
      "Even your shadow tries to walk away from you.",
      "You have the personality of a wet sock.",
      "Scientists are still baffled by the mystery of how you function.",
    ]
    const i = insults[Math.floor(Math.random() * insults.length)]
    await sock.sendMessage(jid, { text: "😂 *Insult for " + target + "*\n\n" + i })
  }
}
