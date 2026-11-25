module.exports = {
  name: "leet",
  async execute(sock, msg, args) {
    const text = args.join(" ")
    if (!text) return sock.sendMessage(msg.key.remoteJid, { text: "Usage: .leet <text>" })
    const map = {a:"4",e:"3",g:"9",i:"1",o:"0",s:"5",t:"7",b:"8",l:"|"}
    const result = text.toLowerCase().split("").map(c => map[c]||c).join("")
    sock.sendMessage(msg.key.remoteJid, { text: "💻 *1337 Speak*\n\n" + result })
  }
}
