module.exports = {
  name: "welcome",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    if (!jid.endsWith("@g.us")) return sock.sendMessage(jid, { text: "❌ Groups only!" })
    const action = args[0]?.toLowerCase()
    if (action === "on") { global.welcome[jid] = true; return sock.sendMessage(jid, { text: "✅ *Welcome messages ON!*\nNew members will be greeted." }) }
    if (action === "off") { delete global.welcome[jid]; return sock.sendMessage(jid, { text: "✅ *Welcome messages OFF.*" }) }
    sock.sendMessage(jid, { text: "Welcome: *" + (global.welcome[jid] ? "ON 🟢" : "OFF 🔴") + "*\nUsage: .welcome on/off" })
  }
}
