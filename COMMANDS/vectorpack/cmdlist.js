const fs   = require("fs")
const path = require("path")
module.exports = {
  name: "cmdlist",
  async execute(sock, msg) {
    const jid    = msg.key.remoteJid
    const cmdDir = path.join(__dirname)
    const files  = fs.readdirSync(cmdDir).filter(f => f.endsWith(".js")).sort()
    const list   = files.map((f, i) => (i+1) + ". " + f.replace(".js","")).join("\n")
    await sock.sendMessage(jid, {
      text: "📁 *Bot Command Files (" + files.length + " total)*\n\n" + list + "\n\n💡 Use .addcmd to add new commands"
    })
  }
}
