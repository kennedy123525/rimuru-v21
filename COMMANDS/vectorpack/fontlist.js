const fontSystem = require("../../lib/fontSystem")
module.exports = {
  name: "fontlist",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid
    const list = fontSystem.getFontList().map(f => f.id+". *"+f.name+"*\n   "+f.sample).join("\n\n")
    await sock.sendMessage(jid, { text: "🔤 *All Font Styles*\n\n" + list + "\n\n💡 Use .setfont <number> to apply" })
  }
}
