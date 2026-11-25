module.exports = {
  name: "flip",
  async execute(sock, msg, args) {
    const text = args.join(" ")
    if (!text) return sock.sendMessage(msg.key.remoteJid, { text: "Usage: .flip <text>" })
    const map = {a:"ɐ",b:"q",c:"ɔ",d:"p",e:"ǝ",f:"ɟ",g:"ƃ",h:"ɥ",i:"ı",j:"ɾ",k:"ʞ",l:"l",m:"ɯ",n:"u",o:"o",p:"d",q:"b",r:"ɹ",s:"s",t:"ʇ",u:"n",v:"ʌ",w:"ʍ",x:"x",y:"ʎ",z:"z"}
    const result = text.toLowerCase().split("").map(c => map[c]||c).reverse().join("")
    sock.sendMessage(msg.key.remoteJid, { text: `🙃 *Flipped:*\n\n${result}` })
  }
}
