const seasons    = require("../../lib/seasons")
const fontSystem = require("../../lib/fontSystem")
const { isOwner } = require("../../lib/auth")
module.exports = {
  name: "setbotseason",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    if (!isOwner(sender)) return sock.sendMessage(jid, { text: "❌ Owner only!" })
    const input = args.join(" ").trim()

    if (!input) {
      return sock.sendMessage(jid, {
        text: "🎄 *Set Bot Season*\n\nCurrent: *" + seasons.getSeasonKey() + "*\n\nAvailable:\n" + seasons.seasonList() +
          "\n\nUsage: *.setbotseason <name>*\nExample: .setbotseason christmas\nRemove: *.setbotseason none*\n\n" +
          "What it changes:\n• Font style (themed)\n• Menu banner + emojis\n• Vector personality (chatbot)\n• AI vibe\n• Command reactions"
      }, { quoted: msg })
    }

    const key = seasons.resolveSeasonName(input)
    if (!key) return sock.sendMessage(jid, { text: "❌ Unknown season *" + input + "*\n\nTry:\n" + seasons.seasonList() })

    global.botSeason = key
    const s = seasons.getSeason()
    if (s.font) {
      global.currentFont = s.font
      global.seasonFont = true
    } else if (global.seasonFont) {
      global.currentFont = 1
      global.seasonFont = false
    }
    fontSystem.ensureFontPatch(sock)
    if (global.saveState) global.saveState()

    const preview = s.font ? fontSystem.convert("VECTOR MD " + s.name + " mode!", s.font) : ""
    await sock.sendMessage(jid, {
      text: s.flag + " *" + s.name + " season activated!*\n\n" + (s.deco || "") + "\n\n" +
        "🔤 Font: " + (s.font ? "#" + s.font + " — " + fontSystem.getFontName(s.font) + "\n   " + preview : "Normal") + "\n" +
        "📋 Menu: re-themed\n" +
        "🤖 Vector: " + s.name + " personality\n" +
        "✨ Reactions: updated\n\n" +
        "Turn off: *.setbotseason none*"
    }, { quoted: msg })
  }
}
