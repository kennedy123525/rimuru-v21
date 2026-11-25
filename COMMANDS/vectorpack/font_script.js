/**
 * .script — script unicode text style
 */
const MAP = {"A":"𝒜","a":"𝒶","B":"ℬ","b":"𝒷","C":"𝒞","c":"𝒸","D":"𝒟","d":"𝒹","E":"ℰ","e":"ℯ","F":"ℱ","f":"𝒻","G":"𝒢","g":"ℊ","H":"ℋ","h":"𝒽","I":"ℐ","i":"𝒾","J":"𝒥","j":"𝒿","K":"𝒦","k":"𝓀","L":"ℒ","l":"𝓁","M":"ℳ","m":"𝓂","N":"𝒩","n":"𝓃","O":"𝒪","o":"ℴ","P":"𝒫","p":"𝓅","Q":"𝒬","q":"𝓆","R":"ℛ","r":"𝓇","S":"𝒮","s":"𝓈","T":"𝒯","t":"𝓉","U":"𝒰","u":"𝓊","V":"𝒱","v":"𝓋","W":"𝒲","w":"𝓌","X":"𝒳","x":"𝓍","Y":"𝒴","y":"𝓎","Z":"𝒵","z":"𝓏"}

module.exports = {
  name: "script",
  category: "unicode",
  description: "Convert text to script style",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    const text = args.join(" ").trim()
    if (!text) return sock.sendMessage(jid, { text: "🔤 Usage: .script <text>\nExample: .script hello world" }, { quoted: msg })
    const out = text.replace(/[A-Za-z0-9]/g, c => MAP[c] || c)
    await sock.sendMessage(jid, { text: out }, { quoted: msg })
  },
}
