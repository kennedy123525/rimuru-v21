module.exports = {
  name: "randomcolor",
  async execute(sock, msg) {
    const hex = Math.floor(Math.random()*0xFFFFFF).toString(16).padStart(6,"0").toUpperCase()
    const r=parseInt(hex.slice(0,2),16),g=parseInt(hex.slice(2,4),16),b=parseInt(hex.slice(4,6),16)
    sock.sendMessage(msg.key.remoteJid, { text: "🎨 *Random Color*\n\nHEX: #" + hex + "\nRGB: rgb(" + r + ", " + g + ", " + b + ")\n\n🔗 https://www.colorhexa.com/" + hex })
  }
}
