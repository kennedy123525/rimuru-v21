const { isPaired } = require("../../lib/auth")
module.exports = {
  name: "protect",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    if (!jid.endsWith("@g.us")) return sock.sendMessage(jid, { text: "❌ Groups only!" })
    if (!isPaired(sender)) return sock.sendMessage(jid, { text: "❌ Paired users only!" })
    if (!global.antiSpam)   global.antiSpam = {}
    if (!global.antiTag)    global.antiTag = {}
    if (!global.antiBadWord) global.antiBadWord = {}
    if (!global.antiBot)    global.antiBot = {}
    if (!global.antiMention) global.antiMention = {}
    if (!global.antiLink)   global.antiLink = {}
    const action = (args[0]||"").toLowerCase()
    const on = action === "on"
    const off = action === "off"
    if (on) {
      global.antiSpam[jid] = true; global.antiTag[jid] = true
      global.antiBadWord[jid] = true; global.antiBot[jid] = true
      global.antiLink[jid] = true; global.antiMention[jid] = true
      if (global.saveState) global.saveState()
      return sock.sendMessage(jid, {
        text: "🛡️ *Full Protection ENABLED!*\n\n" +
              "✅ Anti-Link\n✅ Anti-Spam\n✅ Anti-Tag\n✅ Anti-Mention\n" +
              "✅ Anti-BadWord\n✅ Anti-Bot\n\n_All protections active!_\n_Powered by VECTOR MD_"
      })
    }
    if (off) {
      delete global.antiSpam[jid]; delete global.antiTag[jid]
      delete global.antiBadWord[jid]; delete global.antiBot[jid]
      delete global.antiLink[jid]; delete global.antiMention[jid]
      if (global.saveState) global.saveState()
      return sock.sendMessage(jid, { text: "🛡️ *Full Protection DISABLED.*\n\nAll protections turned off." })
    }
    const s = (v) => v ? "🟢 ON" : "🔴 OFF"
    sock.sendMessage(jid, {
      text: "🛡️ *Protection Status*\n\n" +
            "🔗 Anti-Link: " + s(global.antiLink[jid]) + "\n" +
            "🚿 Anti-Spam: " + s(global.antiSpam[jid]) + "\n" +
            "🏷️ Anti-Tag: " + s(global.antiTag[jid]) + "\n" +
            "📢 Anti-Mention: " + s(global.antiMention[jid]) + "\n" +
            "🚫 Anti-BadWord: " + s(global.antiBadWord[jid]) + "\n" +
            "🤖 Anti-Bot: " + s(global.antiBot[jid]) + "\n\n" +
            "Usage: .protect on/off\n_Powered by VECTOR MD_"
    })
  }
}
