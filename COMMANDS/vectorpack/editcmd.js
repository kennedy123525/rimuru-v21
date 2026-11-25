const fs   = require("fs")
const path = require("path")
const { getNum } = require("../../lib/auth")
module.exports = {
  name: "editcmd",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    const cfg = require("../../lib/vconfig")
    if (getNum(sender) !== cfg.ownerNumber) return sock.sendMessage(jid, { text: "❌ Owner only command!" })
    const filename = args[0]
    const code     = args.slice(1).join(" ").trim()
    if (!filename) return sock.sendMessage(jid, { text: "Usage: .editcmd <file.js> <new code>" })
    const fname = filename.endsWith(".js") ? filename : filename + ".js"
    const fpath = path.join(__dirname, fname)
    if (!fs.existsSync(fpath)) return sock.sendMessage(jid, { text: "❌ File not found: " + fname })
    if (!code) return sock.sendMessage(jid, { text: "❌ No code provided!" })
    const backup = fs.readFileSync(fpath, "utf8").slice(0, 200)
    fs.writeFileSync(fpath, code)
    await sock.sendMessage(jid, { text: "✅ *" + fname + " updated!*\n\n📌 Old code preview:\n```" + backup + "...```" })
  }
}
