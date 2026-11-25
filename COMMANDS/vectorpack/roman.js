module.exports = {
  name: "roman",
  async execute(sock, msg, args) {
    const num = parseInt(args[0])
    if (isNaN(num)||num<1||num>3999) return sock.sendMessage(msg.key.remoteJid, { text: "Usage: .roman <number 1-3999>\nExample: .roman 2026" })
    const vals=[1000,900,500,400,100,90,50,40,10,9,5,4,1]
    const syms=["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"]
    let result="",n=num
    vals.forEach((v,i)=>{while(n>=v){result+=syms[i];n-=v}})
    sock.sendMessage(msg.key.remoteJid, { text: `🏛️ *Roman Numerals*\n\n${num} = *${result}*` })
  }
}
