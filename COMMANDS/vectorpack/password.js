module.exports = {
  name: "password",
  async execute(sock, msg, args) {
    const len = parseInt(args[0]) || 16
    if (len > 50) return sock.sendMessage(msg.key.remoteJid, { text: "❌ Max length is 50." })
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
    const pass = Array.from({length:len}, () => chars[Math.floor(Math.random()*chars.length)]).join("")
    sock.sendMessage(msg.key.remoteJid, { text: `🔐 *Password Generator*\n\nLength: ${len}\nPassword: \`${pass}\`\n\n⚠️ Save this safely!` })
  }
}
