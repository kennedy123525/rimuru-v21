/**
 * .sansbold — sansbold unicode text style
 */
const MAP = {"0":"𝟬","1":"𝟭","2":"𝟮","3":"𝟯","4":"𝟰","5":"𝟱","6":"𝟲","7":"𝟳","8":"𝟴","9":"𝟵","A":"𝗔","a":"𝗮","B":"𝗕","b":"𝗯","C":"𝗖","c":"𝗰","D":"𝗗","d":"𝗱","E":"𝗘","e":"𝗲","F":"𝗙","f":"𝗳","G":"𝗚","g":"𝗴","H":"𝗛","h":"𝗵","I":"𝗜","i":"𝗶","J":"𝗝","j":"𝗷","K":"𝗞","k":"𝗸","L":"𝗟","l":"𝗹","M":"𝗠","m":"𝗺","N":"𝗡","n":"𝗻","O":"𝗢","o":"𝗼","P":"𝗣","p":"𝗽","Q":"𝗤","q":"𝗾","R":"𝗥","r":"𝗿","S":"𝗦","s":"𝘀","T":"𝗧","t":"𝘁","U":"𝗨","u":"𝘂","V":"𝗩","v":"𝘃","W":"𝗪","w":"𝘄","X":"𝗫","x":"𝘅","Y":"𝗬","y":"𝘆","Z":"𝗭","z":"𝘇"}

module.exports = {
  name: "sansbold",
  category: "unicode",
  description: "Convert text to sansbold style",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    const text = args.join(" ").trim()
    if (!text) return sock.sendMessage(jid, { text: "🔤 Usage: .sansbold <text>\nExample: .sansbold hello world" }, { quoted: msg })
    const out = text.replace(/[A-Za-z0-9]/g, c => MAP[c] || c)
    await sock.sendMessage(jid, { text: out }, { quoted: msg })
  },
}
