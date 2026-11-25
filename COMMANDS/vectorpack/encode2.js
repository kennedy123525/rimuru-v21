module.exports = {
  name: "encode2",
  async execute(sock, msg, args) {
    const jid  = msg.key.remoteJid
    const text = args.join(" ")
    if (!text) return sock.sendMessage(jid, { text: "Usage: .encode2 <text>" })
    const morse = { "a":".-","b":"-...","c":"-.-.","d":"-..","e":".","f":"..-.","g":"--.","h":"....","i":"..","j":".---","k":"-.-","l":".-..","m":"--","n":"-.","o":"---","p":".--.","q":"--.-","r":".-.","s":"...","t":"-","u":"..-","v":"...-","w":".--","x":"-..-","y":"-.--","z":"--..","0":"-----","1":".----","2":"..---","3":"...--","4":"....-","5":".....","6":"-....","7":"--...","8":"---..","9":"----.",".":(function(){return ""})()," ":"/" }
    const encoded = text.toLowerCase().split("").map(c => morse[c] || c).join(" ")
    sock.sendMessage(jid, { text: "📡 *Morse Encode*\n\n📝 Original: " + text + "\n\n📡 Morse:\n" + encoded })
  }
}
