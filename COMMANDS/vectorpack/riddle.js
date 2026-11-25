module.exports = {
  name: "riddle",
  async execute(sock, msg) {
    const riddles = [
      { q: "I speak without a mouth and hear without ears. I have no body but come alive with wind. What am I?", a: "An echo" },
      { q: "The more you take, the more you leave behind. What am I?", a: "Footsteps" },
      { q: "I have cities but no houses live there, mountains but no trees, and water but no fish. What am I?", a: "A map" },
      { q: "What has hands but can't clap?", a: "A clock" },
      { q: "What gets wetter the more it dries?", a: "A towel" },
      { q: "I have keys but no locks. I have space but no room. You can enter but can't go inside. What am I?", a: "A keyboard" },
      { q: "What can travel around the world while staying in a corner?", a: "A stamp" },
    ]
    const r = riddles[Math.floor(Math.random()*riddles.length)]
    await sock.sendMessage(msg.key.remoteJid, { text: `🧩 *Riddle*\n\n${r.q}\n\n_Reply with your answer! Answer: ||${r.a}||_` })
  }
}
