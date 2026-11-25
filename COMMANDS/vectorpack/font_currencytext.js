/**
 * .currencytext — curre$n¢y text style
 */
module.exports = {
  name: "currencytext",
  category: "unicode",
  description: "Convert text to currencytext style",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    const text = args.join(" ").trim()
    if (!text) return sock.sendMessage(jid, { text: "🔤 Usage: .currencytext <text>" }, { quoted: msg })
    const out = (t => t.replace(/[A-Za-z]/g, c => {
      const CUR = { a: "₳", b: "฿", c: "¢", d: "Đ", e: "€", f: "₣", g: "₲", h: "Ħ", i: "Ꭵ", j: "ɉ", k: "₭", l: "Ł", m: "₥", n: "₦", o: "Ø", p: "₽", q: "Q", r: "Ɽ", s: "$", t: "₮", u: "Ȗ", v: "V", w: "₩", x: "Ӿ", y: "¥", z: "Ⱬ" }
      return CUR[c.toLowerCase()] || c
    }))(text)
    await sock.sendMessage(jid, { text: out }, { quoted: msg })
  },
}
