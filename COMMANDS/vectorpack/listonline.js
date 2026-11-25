module.exports = {
  name: "listonline",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid
    if (!jid.endsWith("@g.us")) return sock.sendMessage(jid, { text: "❌ Groups only!" })
    try {
      const meta = await sock.groupMetadata(jid)
      const mentions = meta.participants.map(p=>p.id)
      sock.sendMessage(jid, {
        text: "📡 *Members List* (" + meta.participants.length + ")\n\n_Note: WhatsApp doesn't expose online status for privacy reasons._\n\nAll members:\n" + meta.participants.map((p,i) => (i+1)+". @"+p.id.split("@")[0]).join("\n"),
        mentions
      })
    } catch (e) { sock.sendMessage(jid, { text: "❌ " + e.message }) }
  }
}
