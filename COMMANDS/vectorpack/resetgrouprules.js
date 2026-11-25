const { isPaired } = require("../../lib/auth")
module.exports = {
  name: "resetgrouprules",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    if (!jid.endsWith("@g.us")) return sock.sendMessage(jid, { text: "❌ Groups only!" })
    if (!isPaired(sender)) return sock.sendMessage(jid, { text: "❌ Paired users only!" })
    if (global.groupRules?.[jid]) {
      delete global.groupRules[jid]
      if (global.saveState) global.saveState()
    }
    sock.sendMessage(jid, { text: "✅ *Group rules reset!*\n\nNo custom rules set. Use .editgrouprules to add new ones." })
  }
}
