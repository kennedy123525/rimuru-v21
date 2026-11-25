module.exports = {
  name: "antidelete",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    const action = args[0]?.toLowerCase()
    if (action === "on") { global.antiDelete[jid] = true; return sock.sendMessage(jid, { text: "🔍 *Anti-delete ON!*\nDeleted messages will be resent." }) }
    if (action === "off") { delete global.antiDelete[jid]; return sock.sendMessage(jid, { text: "🔍 *Anti-delete OFF.*" }) }
    sock.sendMessage(jid, { text: "Anti-delete: *" + (global.antiDelete[jid] ? "ON 🟢" : "OFF 🔴") + "*\nUsage: .antidelete on/off" })
  }
}
