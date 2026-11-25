const fs   = require("fs")
const path = require("path")
module.exports = {
  name: "removeuser",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    const cfg = require("../../lib/vconfig")
    const norm = j => j ? j.replace(/:\d+@/, "@") : ""
    const ownerJid = cfg.ownerNumber + "@s.whatsapp.net"
    const isPaired = norm(sender) === ownerJid || norm(sender).startsWith(cfg.ownerNumber+"@") ||
                     (global.pairedUsers||[]).some(u => norm(u) === norm(sender))
    if (!isPaired) return sock.sendMessage(jid, { text: "❌ Only paired users can remove users!" })

    const num = args[0]?.replace(/\D/g,"")
    if (!num) return sock.sendMessage(jid, { text: "Usage: .removeuser <number>\nExample: .removeuser 2349012345678" })

    const nj = norm(num + "@s.whatsapp.net")
    if (nj === norm(ownerJid)) return sock.sendMessage(jid, { text: "❌ Cannot remove the owner!" })

    const before = global.pairedUsers.length
    global.pairedUsers = global.pairedUsers.filter(u => norm(u) !== nj && !norm(u).startsWith(num+"@"))
    const file = path.join(__dirname, "../lib/paired.json")
    fs.writeFileSync(file, JSON.stringify(global.pairedUsers, null, 2))

    if (global.pairedUsers.length < before) {
      sock.sendMessage(jid, { text: "✅ *+"+num+" removed!* 🗑️\n\nThey no longer have access to VECTOR MD." })
    } else {
      sock.sendMessage(jid, { text: "❌ +"+num+" not found in paired users." })
    }
  }
}
