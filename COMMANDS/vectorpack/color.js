module.exports = {
  name: "color",
  async execute(sock, msg) {
    const hex = Math.floor(Math.random()*0xFFFFFF).toString(16).padStart(6,"0").toUpperCase()
    const r = parseInt(hex.substring(0,2),16)
    const g = parseInt(hex.substring(2,4),16)
    const b = parseInt(hex.substring(4,6),16)
    sock.sendMessage(msg.key.remoteJid, { text: `🎨 *Random Color*\n\nHEX: #${hex}\nRGB: rgb(${r}, ${g}, ${b})\n\nhttps://www.colorhexa.com/${hex}` })
  }
}
