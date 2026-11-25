/**
 * .mirrortext — mirrored text style
 */
module.exports = {
  name: "mirrortext",
  category: "unicode",
  description: "Convert text to mirrortext style",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    const text = args.join(" ").trim()
    if (!text) return sock.sendMessage(jid, { text: "🔤 Usage: .mirrortext <text>" }, { quoted: msg })
    const out = (t => t.split("").reverse().join("").replace(/[A-Za-z0-9]/g, c => {
      const M = { a: "ɒ", b: "d", c: "ɔ", d: "b", e: "ɘ", f: "ʇ", g: "ϱ", h: "ʜ", i: "i", j: "ꞁ", k: "ʞ", l: "l", m: "m", n: "n", o: "o", p: "q", q: "p", r: "ɿ", s: "ƨ", t: "ƚ", u: "u", v: "v", w: "w", x: "x", y: "y", z: "z", A: "A", B: "ᙠ", C: "Ɔ", D: "ᗡ", E: "Ǝ", F: "ꟻ", G: "Ә", H: "H", I: "I", J: "Ⴑ", K: "ꓘ", L: "⅃", M: "M", N: "И", O: "O", P: "ꟼ", Q: "Ǫ", R: "Я", S: "Ƨ", T: "T", U: "U", V: "V", W: "W", X: "X", Y: "Y", Z: "Ƹ" }
      return M[c] || c
    }))(text)
    await sock.sendMessage(jid, { text: out }, { quoted: msg })
  },
}
