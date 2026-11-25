const { isPaired } = require("../../lib/auth")
module.exports = {
  name: "creategc",
  async execute(sock, msg, args, sender) {
    const jid  = msg.key.remoteJid
    if (!isPaired(sender)) return sock.sendMessage(jid, { text: "❌ Paired users only!" })
    const name = args.join(" ")
    if (!name) return sock.sendMessage(jid, { text: "Usage: .creategc <group name>" })
    try {
      const group = await sock.groupCreate(name, [sender])
      const gid   = group.id || group.gid
      let link = ""
      try {
        const code = await sock.groupInviteCode(gid)
        link = "\n🔗 Link: https://chat.whatsapp.com/" + code
      } catch {}
      await sock.sendMessage(jid, { text: "✅ Group *" + name + "* created!" + link })
    } catch(e) { sock.sendMessage(jid, { text: "❌ Failed: " + e.message }) }
  }
}
