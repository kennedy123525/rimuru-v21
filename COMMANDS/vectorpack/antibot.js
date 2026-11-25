module.exports = {
  name: "antibot",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    if (!jid.endsWith("@g.us")) return sock.sendMessage(jid, { text: "❌ Groups only!" })
    const action = args[0]?.toLowerCase()
    if (action === "on") { global.antiBot[jid] = true; return sock.sendMessage(jid, { text: "✅ *Anti-bot enabled!*\nBot accounts are blocked from messaging." }) }
    if (action === "off") { delete global.antiBot[jid]; return sock.sendMessage(jid, { text: "✅ *Anti-bot disabled.*" }) }
    sock.sendMessage(jid, { text: "Anti-bot: *" + (global.antiBot[jid] ? "ON 🟢" : "OFF 🔴") + "*\nUsage: .antibot on/off" })
  }
}
