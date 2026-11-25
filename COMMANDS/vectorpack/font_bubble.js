/**
 * .bubble — bubble unicode text style
 */
const MAP = {"0":"⓪","1":"①","A":"Ⓐ","a":"ⓐ","B":"Ⓑ","b":"ⓑ","C":"Ⓒ","c":"ⓒ","D":"Ⓓ","d":"ⓓ","E":"Ⓔ","e":"ⓔ","F":"Ⓕ","f":"ⓕ","G":"Ⓖ","g":"ⓖ","H":"Ⓗ","h":"ⓗ","I":"Ⓘ","i":"ⓘ","J":"Ⓙ","j":"ⓙ","K":"Ⓚ","k":"ⓚ","L":"Ⓛ","l":"ⓛ","M":"Ⓜ","m":"ⓜ","N":"Ⓝ","n":"ⓝ","O":"Ⓞ","o":"ⓞ","P":"Ⓟ","p":"ⓟ","Q":"Ⓠ","q":"ⓠ","R":"Ⓡ","r":"ⓡ","S":"Ⓢ","s":"ⓢ","T":"Ⓣ","t":"ⓣ","U":"Ⓤ","u":"ⓤ","V":"Ⓥ","v":"ⓥ","W":"Ⓦ","w":"ⓦ","X":"Ⓧ","x":"ⓧ","Y":"Ⓨ","y":"ⓨ","Z":"Ⓩ","z":"ⓩ"}

module.exports = {
  name: "bubble",
  category: "unicode",
  description: "Convert text to bubble style",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    const text = args.join(" ").trim()
    if (!text) return sock.sendMessage(jid, { text: "🔤 Usage: .bubble <text>\nExample: .bubble hello world" }, { quoted: msg })
    const out = text.replace(/[A-Za-z0-9]/g, c => MAP[c] || c)
    await sock.sendMessage(jid, { text: out }, { quoted: msg })
  },
}
