const fontSystem = require("../../lib/fontSystem")
const { isPaired } = require("../../lib/auth")
module.exports = {
  name: "setfont",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    if (!isPaired(sender)) return sock.sendMessage(jid, { text: "❌ Paired users only!" })
    if (!args[0]) {
      const list = fontSystem.getFontList().map(f => "  *"+f.id+".* "+f.name+" — "+f.sample).join("\n")
      return sock.sendMessage(jid, {
        text: "🔤 *Font Styles (1-" + fontSystem.maxFont + ")*\n\n" + list + "\n\nUsage: *.setfont <number>*\nExample: .setfont 6\n\n_Use .setfont 1 to reset to Normal_"
      })
    }
    const num = parseInt(args[0])
    if (!fontSystem.isValidFont(num)) return sock.sendMessage(jid, {
      text: "❌ Invalid font number! Use 1-" + fontSystem.maxFont + "\nSee .setfont for all styles."
    })
    global.currentFont = num
    const name    = fontSystem.getFontName(num)
    const preview = fontSystem.convert("VECTOR MD is active!", num)
    const notice  = fontSystem.convert("Font " + num + " — " + name + " applied!", num)
    await sock.sendMessage(jid, {
      text: "✅ *Font changed to #" + num + " — " + name + "*\n\n" +
            "Preview: _" + preview + "_\n\n" +
            notice + "\n\n" +
            "_Every bot message will now use this font_\n" +
            "_Use .setfont 1 to go back to Normal_"
    })
    // Apply font: patch global sendMessage to auto-convert text
    fontSystem.ensureFontPatch(sock)
  }
}
