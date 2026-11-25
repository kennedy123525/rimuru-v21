/**
 * .bold — bold unicode text style
 */
const MAP = {"0":"𝟎","1":"𝟏","2":"𝟐","3":"𝟑","4":"𝟒","5":"𝟓","6":"𝟔","7":"𝟕","8":"𝟖","9":"𝟗","A":"𝐀","a":"𝐚","B":"𝐁","b":"𝐛","C":"𝐂","c":"𝐜","D":"𝐃","d":"𝐝","E":"𝐄","e":"𝐞","F":"𝐅","f":"𝐟","G":"𝐆","g":"𝐠","H":"𝐇","h":"𝐡","I":"𝐈","i":"𝐢","J":"𝐉","j":"𝐣","K":"𝐊","k":"𝐤","L":"𝐋","l":"𝐥","M":"𝐌","m":"𝐦","N":"𝐍","n":"𝐧","O":"𝐎","o":"𝐨","P":"𝐏","p":"𝐩","Q":"𝐐","q":"𝐪","R":"𝐑","r":"𝐫","S":"𝐒","s":"𝐬","T":"𝐓","t":"𝐭","U":"𝐔","u":"𝐮","V":"𝐕","v":"𝐯","W":"𝐖","w":"𝐰","X":"𝐗","x":"𝐱","Y":"𝐘","y":"𝐲","Z":"𝐙","z":"𝐳"}

module.exports = {
  name: "bold",
  category: "unicode",
  description: "Convert text to bold style",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    const text = args.join(" ").trim()
    if (!text) return sock.sendMessage(jid, { text: "🔤 Usage: .bold <text>\nExample: .bold hello world" }, { quoted: msg })
    const out = text.replace(/[A-Za-z0-9]/g, c => MAP[c] || c)
    await sock.sendMessage(jid, { text: out }, { quoted: msg })
  },
}
