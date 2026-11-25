module.exports = {
  name: "rolldice",
  async execute(sock, msg, args) {
    const sides = parseInt(args[0]) || 6
    if (sides < 2 || sides > 100) return sock.sendMessage(msg.key.remoteJid, { text: "Usage: .rolldice <sides>\nExample: .rolldice 20 (rolls a 20-sided die)" })
    const result = Math.floor(Math.random()*sides)+1
    sock.sendMessage(msg.key.remoteJid, { text: "🎲 *Roll d" + sides + "*\n\nResult: *" + result + "/" + sides + "*" })
  }
}
