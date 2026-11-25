module.exports = {
  name: "groupjid",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid
    if (!jid.endsWith("@g.us")) return sock.sendMessage(jid, { text: "❌ Groups only!" })
    sock.sendMessage(jid, { text: "🆔 *Group JID*\n\n`" + jid + "`\n\nYou can use this JID to manage the group." })
  }
}
