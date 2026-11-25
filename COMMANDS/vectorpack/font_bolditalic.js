/**
 * .bolditalic — bolditalic unicode text style
 */
const MAP = {"0":"𝟎","1":"𝟏","2":"𝟐","3":"𝟑","4":"𝟒","5":"𝟓","6":"𝟔","7":"𝟕","8":"𝟖","9":"𝟗","A":"𝑨","a":"𝒂","B":"𝑩","b":"𝒃","C":"𝑪","c":"𝒄","D":"𝑫","d":"𝒅","E":"𝑬","e":"𝒆","F":"𝑭","f":"𝒇","G":"𝑮","g":"𝒈","H":"𝑯","h":"𝒉","I":"𝑰","i":"𝒊","J":"𝑱","j":"𝒋","K":"𝑲","k":"𝒌","L":"𝑳","l":"𝒍","M":"𝑴","m":"𝒎","N":"𝑵","n":"𝒏","O":"𝑶","o":"𝒐","P":"𝑷","p":"𝒑","Q":"𝑸","q":"𝒒","R":"𝑹","r":"𝒓","S":"𝑺","s":"𝒔","T":"𝑻","t":"𝒕","U":"𝑼","u":"𝒖","V":"𝑽","v":"𝒗","W":"𝑾","w":"𝒘","X":"𝑿","x":"𝒙","Y":"𝒀","y":"𝒚","Z":"𝒁","z":"𝒛"}

module.exports = {
  name: "bolditalic",
  category: "unicode",
  description: "Convert text to bolditalic style",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    const text = args.join(" ").trim()
    if (!text) return sock.sendMessage(jid, { text: "🔤 Usage: .bolditalic <text>\nExample: .bolditalic hello world" }, { quoted: msg })
    const out = text.replace(/[A-Za-z0-9]/g, c => MAP[c] || c)
    await sock.sendMessage(jid, { text: out }, { quoted: msg })
  },
}
