module.exports = {
  name: "genpass",
  async execute(sock, msg, args) {
    const len = parseInt(args[0]) || 12
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
    let pass = ""
    for (let i=0;i<len;i++) pass += chars[Math.floor(Math.random()*chars.length)]
    sock.sendMessage(msg.key.remoteJid, {text:`🔐 *Generated Password*\n\n\`${pass}\`\n\n⚠️ Save this securely!`})
  }
}