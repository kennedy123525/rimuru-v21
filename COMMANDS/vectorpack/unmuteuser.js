const { isPaired, getNum } = require("../../lib/auth")
module.exports = {
  name: "unmuteuser",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    if (!jid.endsWith("@g.us")) return sock.sendMessage(jid, { text: "❌ Groups only!" })
    if (!isPaired(sender)) return sock.sendMessage(jid, { text: "❌ Paired users only!" })
    if (!global.mutedUsers) global.mutedUsers = {}
    const ctx          = msg.message?.extendedTextMessage?.contextInfo
    const mentionedJid = ctx?.mentionedJid?.[0] || null
    const repliedFrom  = ctx?.participant || null
    let target = mentionedJid || repliedFrom
    if (!target) {
      const numArg = args.find(a => /^\d{7,}$/.test(a))
      if (numArg) target = numArg + "@s.whatsapp.net"
      else return sock.sendMessage(jid, { text: "Usage: Reply to a muted user's message with .unmuteuser" })
    }
    const targetNum = getNum(target)
    const targetJid = targetNum + "@s.whatsapp.net"
    const muteKey   = jid + targetJid
    // Check all possible key formats
    const keys = [muteKey, jid + target]
    let found = false
    for (const k of keys) {
      if (global.mutedUsers[k]) {
        if (global.mutedUsers[k]?.timeoutId) clearTimeout(global.mutedUsers[k].timeoutId)
        delete global.mutedUsers[k]
        found = true
        break
      }
    }
    if (!found) return sock.sendMessage(jid, { text: "@" + targetNum + " is not muted.", mentions: [targetJid] })
    await sock.sendMessage(jid, { text: "🔊 @" + targetNum + " unmuted! 🎉", mentions: [targetJid] })
  }
}
