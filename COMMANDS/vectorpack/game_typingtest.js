/**
 * .typingtest — how fast can you type the sentence?
 */
const SENTENCES = ["vector md never misses", "the quick brown fox jumps over the lazy dog", "speed is nothing without control", "typing fast is a flex honestly", "bots do it better but humans try"]
module.exports = {
  name: "typingtest",
  category: "games",
  description: "Typing speed challenge",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    if (!global.typingTests) global.typingTests = {}
    const t = global.typingTests[sender]
    if (t) {
      const secs = (Date.now() - t.start) / 1000
      const exact = (args.join(" ").trim().toLowerCase() === t.text)
      delete global.typingTests[sender]
      if (!exact) return sock.sendMessage(jid, { text: "❌ Not exact! The sentence was: _" + t.text + "_" }, { quoted: msg })
      const cps = (t.text.length / secs).toFixed(1)
      const wpm = Math.round((t.text.split(" ").length / secs) * 60)
      return sock.sendMessage(jid, { text: "⌨️ *TIME: " + secs.toFixed(1) + "s*\n\n📊 Speed: *" + wpm + " WPM* (" + cps + " chars/s)\n" + (wpm > 60 ? "🏆 Keyboard warrior!" : wpm > 40 ? "⚡ Solid speed!" : "🐢 Cozy pace!") }, { quoted: msg })
    }
    const text = SENTENCES[Math.floor(Math.random() * SENTENCES.length)]
    global.typingTests[sender] = { text, start: Date.now() }
    await sock.sendMessage(jid, { text: "⌨️ *TYPING TEST*\n\nType this exactly, with the command:\n.type " + text + "\n\nTimer starts NOW ⏱️" }, { quoted: msg })
  },
}
