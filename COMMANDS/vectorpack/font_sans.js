/**
 * .sans — sans unicode text style
 */
const MAP = {"0":"𝟢","1":"𝟣","2":"𝟤","3":"𝟥","4":"𝟦","5":"𝟧","6":"𝟨","7":"𝟩","8":"𝟪","9":"𝟫","A":"𝖠","a":"𝖺","B":"𝖡","b":"𝖻","C":"𝖢","c":"𝖼","D":"𝖣","d":"𝖽","E":"𝖤","e":"𝖾","F":"𝖥","f":"𝖿","G":"𝖦","g":"𝗀","H":"𝖧","h":"𝗁","I":"𝖨","i":"𝗂","J":"𝖩","j":"𝗃","K":"𝖪","k":"𝗄","L":"𝖫","l":"𝗅","M":"𝖬","m":"𝗆","N":"𝖭","n":"𝗇","O":"𝖮","o":"𝗈","P":"𝖯","p":"𝗉","Q":"𝖰","q":"𝗊","R":"𝖱","r":"𝗋","S":"𝖲","s":"𝗌","T":"𝖳","t":"𝗍","U":"𝖴","u":"𝗎","V":"𝖵","v":"𝗏","W":"𝖶","w":"𝗐","X":"𝖷","x":"𝗑","Y":"𝖸","y":"𝗒","Z":"𝖹","z":"𝗓"}

module.exports = {
  name: "sans",
  category: "unicode",
  description: "Convert text to sans style",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    const text = args.join(" ").trim()
    if (!text) return sock.sendMessage(jid, { text: "🔤 Usage: .sans <text>\nExample: .sans hello world" }, { quoted: msg })
    const out = text.replace(/[A-Za-z0-9]/g, c => MAP[c] || c)
    await sock.sendMessage(jid, { text: out }, { quoted: msg })
  },
}
