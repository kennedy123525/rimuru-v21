module.exports = {
  name: "hidetag",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    if (!jid.endsWith("@g.us")) return sock.sendMessage(jid, {text:"❌ Groups only!"})
    try {
      const meta = await sock.groupMetadata(jid)
      const mentions = meta.participants.map(m=>m.id)
      sock.sendMessage(jid, {text: args.join(" ") || "📢 Message from admin", mentions})
    } catch { sock.sendMessage(jid, {text:"❌ Failed."}) }
  }
}