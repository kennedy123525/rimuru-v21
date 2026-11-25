module.exports = {
  name: "antihijack",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    if (!jid.endsWith("@g.us")) return sock.sendMessage(jid, { text: "❌ Groups only!" })
    const action = args[0]?.toLowerCase()
    if (!global.antiHijack) global.antiHijack = {}
    if (action === "on") { global.antiHijack[jid] = true; return sock.sendMessage(jid, { text: "🛡️ *Anti-hijack ON!*\nIf bot is demoted, it will attempt to re-promote itself." }) }
    if (action === "off") { delete global.antiHijack[jid]; return sock.sendMessage(jid, { text: "🛡️ *Anti-hijack OFF.*" }) }
    sock.sendMessage(jid, { text: "Anti-hijack: *" + (global.antiHijack?.[jid] ? "ON 🟢" : "OFF 🔴") + "*\nUsage: .antihijack on/off" })
  }
}
