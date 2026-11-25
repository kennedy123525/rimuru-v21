module.exports = {
  name: "listusers",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    const config = require("../../lib/vconfig")
    if (sender !== config.ownerNumber + "@s.whatsapp.net") return sock.sendMessage(jid, { text: "❌ Owner only." })
    const list = global.pairedUsers.map((u,i) => (i+1)+". +" + u.split("@")[0]).join("\n")
    sock.sendMessage(jid, { text: "👥 *Authorized Users (" + global.pairedUsers.length + ")*\n\n" + list })
  }
}
