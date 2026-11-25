module.exports = {
  name: "piglatin",
  async execute(sock, msg, args) {
    const text = args.join(" ")
    if (!text) return sock.sendMessage(msg.key.remoteJid, { text: "Usage: .piglatin <text>" })
    const vowels = "aeiouAEIOU"
    const result = text.split(" ").map(w => {
      if (!w) return w
      if (vowels.includes(w[0])) return w + "way"
      let i = 0; while(i < w.length && !vowels.includes(w[i])) i++
      return w.slice(i) + w.slice(0,i) + "ay"
    }).join(" ")
    sock.sendMessage(msg.key.remoteJid, { text: "🐷 *Pig Latin*\n\n" + result })
  }
}
