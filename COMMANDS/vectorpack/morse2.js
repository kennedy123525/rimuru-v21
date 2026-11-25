const MORSE = {".-":"A","-...":"B","-.-.":"C","-..":"D",".":"E","..-.":"F","--.":"G","....":"H","..":"I",".---":"J","-.-":"K",".-..":"L","--":"M","-.":"N","---":"O",".--.":"P","--.-":"Q",".-.":"R","...":"S","-":"T","..-":"U","...-":"V",".--":"W","-..-":"X","-.--":"Y","--..":"Z","-----":"0",".----":"1","..---":"2","...--":"3","....-":"4",".....":"5","-....":"6","--...":"7","---..":"8","----.":"9"}
module.exports = {
  name: "demorse",
  async execute(sock, msg, args) {
    const jid  = msg.key.remoteJid
    const code = args.join(" ")
    if (!code) return sock.sendMessage(jid, { text: "Usage: .demorse <morse code>\nExample: .demorse ... --- ..." })
    const decoded = code.split("/").map(w => w.trim().split(" ").map(c => MORSE[c.trim()] || "?").join("")).join(" ")
    sock.sendMessage(jid, { text: "📡 *Morse Decode*\n\nInput: " + code + "\nDecoded: *" + decoded + "*" })
  }
}
