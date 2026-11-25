module.exports = {
  name: "morse",
  async execute(sock, msg, args) {
    const text = args.join(" ").toUpperCase()
    if (!text) return sock.sendMessage(msg.key.remoteJid, { text: "Usage: .morse <text>\nExample: .morse SOS" })
    const code = {A:".-",B:"-...",C:"-.-.",D:"-..",E:".",F:"..-.",G:"--.",H:"....",I:"..",J:".---",K:"-.-",L:".-..",M:"--",N:"-.",O:"---",P:".--.",Q:"--.-",R:".-.",S:"...",T:"-",U:"..-",V:"...-",W:".--",X:"-..-",Y:"-.--",Z:"--.."," ":"/","1":".----","2":"..---","3":"...--","4":"....-","5":".....","6":"-....","7":"--...","8":"---..","9":"----.","0":"-----"}
    const result = text.split("").map(c => code[c]||"?").join(" ")
    sock.sendMessage(msg.key.remoteJid, { text: "📡 *Morse Code:*\n\n" + result })
  }
}
