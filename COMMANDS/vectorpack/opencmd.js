const fs   = require("fs")
const path = require("path")
const { getNum } = require("../../lib/auth")
module.exports = {
  name: "opencmd",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    const cfg = require("../../lib/vconfig")
    if (getNum(sender) !== cfg.ownerNumber) return sock.sendMessage(jid, { text: "❌ Owner only command!" })
    const filename = args[0]
    if (!filename) return sock.sendMessage(jid, { text: "Usage: .opencmd <filename.js>\nExample: .opencmd ping.js" })
    const fname = filename.endsWith(".js") ? filename : filename + ".js"
    const fpath = path.join(__dirname, fname)
    if (!fs.existsSync(fpath)) return sock.sendMessage(jid, { text: "❌ File *" + fname + "* not found!" })
    const code = fs.readFileSync(fpath, "utf8")
    if (code.length > 3000) {
      await sock.sendMessage(jid, { text: "📄 *" + fname + "* (" + code.length + " chars)\n\n```\n" + code.slice(0,2900) + "\n...```" })
    } else {
      await sock.sendMessage(jid, { text: "📄 *" + fname + "*\n\n```\n" + code + "\n```" })
    }
  }
}
