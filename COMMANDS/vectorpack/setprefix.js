const { isPaired } = require("../../lib/auth")
const fs   = require("fs")
const path = require("path")
module.exports = {
  name: "setprefix",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    if (!isPaired(sender)) return sock.sendMessage(jid, { text: "❌ Paired users only!" })
    const newPrefix = args[0]
    if (!newPrefix) return sock.sendMessage(jid, {
      text: "🔧 *Set Prefix*\n\nUsage: .setprefix <new>\nCurrent: *" + (global.currentPrefix||".") + "*\n\nExamples: .setprefix ! or .setprefix - or .setprefix /"
    })
    const oldPrefix    = global.currentPrefix || "."
    global.currentPrefix = newPrefix
    try {
      const cfgPath = path.join(__dirname, "..", "config.js")
      let cfgContent = fs.readFileSync(cfgPath, "utf8")
      cfgContent = cfgContent.replace(/prefix:\s*["'][^"']*["']/, 'prefix: "' + newPrefix + '"')
      fs.writeFileSync(cfgPath, cfgContent)
    } catch {}
    await sock.sendMessage(jid, {
      text: "✅ *Prefix Changed!*\n\nOld: *" + oldPrefix + "*\nNew: *" + newPrefix + "*\n\nNow use: *" + newPrefix + "menu*, *" + newPrefix + "ping*, etc."
    })
  }
}
