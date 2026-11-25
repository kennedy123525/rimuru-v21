/**
 * .italic — italic unicode text style
 */
const MAP = {"A":"𝐴","a":"𝑎","B":"𝐵","b":"𝑏","C":"𝐶","c":"𝑐","D":"𝐷","d":"𝑑","E":"𝐸","e":"𝑒","F":"𝐹","f":"𝑓","G":"𝐺","g":"𝑔","H":"𝐻","h":"ℎ","I":"𝐼","i":"𝑖","J":"𝐽","j":"𝑗","K":"𝐾","k":"𝑘","L":"𝐿","l":"𝑙","M":"𝑀","m":"𝑚","N":"𝑁","n":"𝑛","O":"𝑂","o":"𝑜","P":"𝑃","p":"𝑝","Q":"𝑄","q":"𝑞","R":"𝑅","r":"𝑟","S":"𝑆","s":"𝑠","T":"𝑇","t":"𝑡","U":"𝑈","u":"𝑢","V":"𝑉","v":"𝑣","W":"𝑊","w":"𝑤","X":"𝑋","x":"𝑥","Y":"𝑌","y":"𝑦","Z":"𝑍","z":"𝑧"}

module.exports = {
  name: "italic",
  category: "unicode",
  description: "Convert text to italic style",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    const text = args.join(" ").trim()
    if (!text) return sock.sendMessage(jid, { text: "🔤 Usage: .italic <text>\nExample: .italic hello world" }, { quoted: msg })
    const out = text.replace(/[A-Za-z0-9]/g, c => MAP[c] || c)
    await sock.sendMessage(jid, { text: out }, { quoted: msg })
  },
}
