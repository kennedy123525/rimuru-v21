module.exports = {
  name: "goodbye",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    if (!jid.endsWith("@g.us")) return sock.sendMessage(jid, { text: "❌ Groups only!" })
    const action = args[0]?.toLowerCase()
    if (action === "on") { global.goodbye[jid] = true; return sock.sendMessage(jid, { text: "✅ *Goodbye messages ON!*" }) }
    if (action === "off") { delete global.goodbye[jid]; return sock.sendMessage(jid, { text: "✅ *Goodbye messages OFF.*" }) }
    sock.sendMessage(jid, { text: "Goodbye: *" + (global.goodbye[jid] ? "ON 🟢" : "OFF 🔴") + "*\nUsage: .goodbye on/off" })
  }
}
