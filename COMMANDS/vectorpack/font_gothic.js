/**
 * .gothic — gothic unicode text style
 */
const MAP = {"A":"𝔄","a":"𝔞","B":"𝔅","b":"𝔟","C":"ℭ","c":"𝔠","D":"𝔇","d":"𝔡","E":"𝔈","e":"𝔢","F":"𝔉","f":"𝔣","G":"𝔊","g":"𝔤","H":"ℌ","h":"𝔥","I":"ℑ","i":"𝔦","J":"𝔍","j":"𝔧","K":"𝔎","k":"𝔨","L":"𝔏","l":"𝔩","M":"𝔐","m":"𝔪","N":"𝔑","n":"𝔫","O":"𝔒","o":"𝔬","P":"𝔓","p":"𝔭","Q":"𝔔","q":"𝔮","R":"ℜ","r":"𝔯","S":"𝔖","s":"𝔰","T":"𝔗","t":"𝔱","U":"𝔘","u":"𝔲","V":"𝔙","v":"𝔳","W":"𝔚","w":"𝔴","X":"𝔛","x":"𝔵","Y":"𝔜","y":"𝔶","Z":"ℨ","z":"𝔷"}

module.exports = {
  name: "gothic",
  category: "unicode",
  description: "Convert text to gothic style",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    const text = args.join(" ").trim()
    if (!text) return sock.sendMessage(jid, { text: "🔤 Usage: .gothic <text>\nExample: .gothic hello world" }, { quoted: msg })
    const out = text.replace(/[A-Za-z0-9]/g, c => MAP[c] || c)
    await sock.sendMessage(jid, { text: out }, { quoted: msg })
  },
}
