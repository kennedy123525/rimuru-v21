const fs   = require("fs")
const path = require("path")
module.exports = {
  name: "addcmd",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    const cfg = require("../../lib/vconfig")

    if (!args[0]) {
      return sock.sendMessage(jid, {
        text: "⚙️ *Add Command*\n\nUsage:\n.addcmd <filename.js> <code>\n\nExample:\n.addcmd hello.js module.exports={name:'hello',async execute(sock,msg){await sock.sendMessage(msg.key.remoteJid,{text:'Hello World!'})}}\n\n💡 The command will be available immediately!"
      })
    }

    const filename = args[0].endsWith(".js") ? args[0] : args[0] + ".js"
    const code     = args.slice(1).join(" ")

    if (!code) return sock.sendMessage(jid, { text: "❌ No code provided!\n\nUsage: .addcmd <file.js> <code>" })

    // Safety: basic validation
    if (code.includes("require('fs')") || code.includes("require(\"fs\")")) {
      // fs is allowed but check for destructive ops
      if (code.includes("unlinkSync") || code.includes("rmdir") || code.includes("rm -")) {
        return sock.sendMessage(jid, { text: "❌ Code contains potentially dangerous operations!" })
      }
    }

    const cmdDir  = path.join(__dirname)
    const cmdPath = path.join(cmdDir, filename)

    // Test syntax first
    const tmpPath = path.join(require("os").tmpdir(), "test_" + Date.now() + ".js")
    fs.writeFileSync(tmpPath, code)
    const { execSync } = require("child_process")
    let syntaxOk = true
    try { execSync("node --check " + tmpPath, { timeout: 5000 }) } catch { syntaxOk = false }
    try { fs.unlinkSync(tmpPath) } catch {}

    if (!syntaxOk) {
      return sock.sendMessage(jid, { text: "❌ Syntax error in your code! Check and try again." })
    }

    fs.writeFileSync(cmdPath, code)
    await sock.sendMessage(jid, {
      text: "✅ *Command Added!*\n\n📁 File: " + filename + "\n\n_Restart the bot to load it, or use .reload if available._\n\n💡 The command should work after bot restart."
    })
  }
}
