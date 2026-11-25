const { isPaired } = require("../../lib/auth")
module.exports = {
  name: "antibadword",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    if (!jid.endsWith("@g.us")) return sock.sendMessage(jid, { text: "❌ Groups only!" })
    if (!isPaired(sender)) return sock.sendMessage(jid, { text: "❌ Paired users only!" })
    if (!global.antiBadWord) global.antiBadWord = {}
    const action = (args[0]||"").toLowerCase()
    try {
      const meta = await sock.groupMetadata(jid)
      const { getNum } = require("../../lib/auth")
      const botId = getNum(sock.user?.id || "")
      const botMember = meta.participants.find(p => getNum(p.id) === botId)
      if (action === "on" && !botMember?.admin) return sock.sendMessage(jid, { text: "⚠️ I need to be an admin for anti-bad word to work!" })
    } catch {}
    if (action === "on") { global.antiBadWord[jid] = true; if (global.saveState) global.saveState(); return sock.sendMessage(jid, { text: "✅ *Anti-Bad Word ON!* 🚫\n\nBad words will be deleted. Use .addbadword to add words." }) }
    if (action === "off") { delete global.antiBadWord[jid]; if (global.saveState) global.saveState(); return sock.sendMessage(jid, { text: "❌ *Anti-Bad Word OFF.*" }) }
    sock.sendMessage(jid, { text: "🚫 Anti-Bad Word: *" + (global.antiBadWord[jid] ? "ON 🟢" : "OFF 🔴") + "*\n\nUsage: .antibadword on/off" })
  }
}
