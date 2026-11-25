const { isPaired } = require("../../lib/auth")
module.exports = {
  name: "editgrouprules",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    if (!jid.endsWith("@g.us")) return sock.sendMessage(jid, { text: "❌ Groups only!" })
    if (!isPaired(sender)) return sock.sendMessage(jid, { text: "❌ Paired users only!" })
    const rules = args.join(" ").trim()
    if (!rules) return sock.sendMessage(jid, { text: "Usage: .editgrouprules <new rules>\nExample: .editgrouprules No spam, No bad words, Respect everyone" })
    if (!global.groupRules) global.groupRules = {}
    global.groupRules[jid] = rules
    await sock.sendMessage(jid, {
      text: "📋 *Group Rules Updated!*\n\n" + rules + "\n\n_Use .grouprules to view_"
    })
  }
}
