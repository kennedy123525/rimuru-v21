module.exports = {
  name: "emoji",
  async execute(sock, msg, args) {
    const text = args.join(" ")
    if (!text) return sock.sendMessage(msg.key.remoteJid, { text: "Usage: .emoji <text>\nExample: .emoji hello" })
    const map = {a:"🅰️",b:"🅱️",c:"🇨",d:"🇩",e:"🇪",f:"🇫",g:"🇬",h:"🇭",i:"ℹ️",j:"🇯",k:"🇰",l:"🇱",m:"Ⓜ️",n:"🇳",o:"🅾️",p:"🅿️",q:"🇶",r:"🇷",s:"🇸",t:"🇹",u:"🇺",v:"🇻",w:"🇼",x:"❌",y:"🇾",z:"💤"," ":"  "}
    const result = text.toLowerCase().split("").map(c => map[c] || c).join(" ")
    sock.sendMessage(msg.key.remoteJid, { text: result })
  }
}
