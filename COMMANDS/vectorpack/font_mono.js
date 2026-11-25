/**
 * .mono — mono unicode text style
 */
const MAP = {"0":"𝟶","1":"𝟷","2":"𝟸","3":"𝟹","4":"𝟺","5":"𝟻","6":"𝟼","7":"𝟽","8":"𝟾","9":"𝟿","A":"𝙰","a":"𝚊","B":"𝙱","b":"𝚋","C":"𝙲","c":"𝚌","D":"𝙳","d":"𝚍","E":"𝙴","e":"𝚎","F":"𝙵","f":"𝚏","G":"𝙶","g":"𝚐","H":"𝙷","h":"𝚑","I":"𝙸","i":"𝚒","J":"𝙹","j":"𝚓","K":"𝙺","k":"𝚔","L":"𝙻","l":"𝚕","M":"𝙼","m":"𝚖","N":"𝙽","n":"𝚗","O":"𝙾","o":"𝚘","P":"𝙿","p":"𝚙","Q":"𝚀","q":"𝚚","R":"𝚁","r":"𝚛","S":"𝚂","s":"𝚜","T":"𝚃","t":"𝚝","U":"𝚄","u":"𝚞","V":"𝚅","v":"𝚟","W":"𝚆","w":"𝚠","X":"𝚇","x":"𝚡","Y":"𝚈","y":"𝚢","Z":"𝚉","z":"𝚣"}

module.exports = {
  name: "mono",
  category: "unicode",
  description: "Convert text to mono style",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    const text = args.join(" ").trim()
    if (!text) return sock.sendMessage(jid, { text: "🔤 Usage: .mono <text>\nExample: .mono hello world" }, { quoted: msg })
    const out = text.replace(/[A-Za-z0-9]/g, c => MAP[c] || c)
    await sock.sendMessage(jid, { text: out }, { quoted: msg })
  },
}
