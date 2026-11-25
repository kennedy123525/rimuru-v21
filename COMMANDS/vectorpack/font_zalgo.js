/**
 * .zalgo — z̷a̷l̷g̷o̷ text style
 */
module.exports = {
  name: "zalgo",
  category: "unicode",
  description: "Convert text to zalgo style",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    const text = args.join(" ").trim()
    if (!text) return sock.sendMessage(jid, { text: "🔤 Usage: .zalgo <text>" }, { quoted: msg })
    const out = (t => t.split("").map(c => {
      if (c === " ") return c
      const marks = ["\u0300","\u0301","\u0316","\u0317","\u0333","\u0323","\u0324","\u0325","\u0330","\u0331","\u0348","\u0349"]
      let out = c
      for (let i = 0; i < 2 + Math.floor(Math.random() * 3); i++) out += marks[Math.floor(Math.random() * marks.length)]
      return out
    }).join(""))(text)
    await sock.sendMessage(jid, { text: out }, { quoted: msg })
  },
}
