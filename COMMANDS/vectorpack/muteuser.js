const { isPaired, getNum } = require("../../lib/auth")
module.exports = {
  name: "muteuser",
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
      else return sock.sendMessage(jid, {
        text: "Usage:\n• Reply to a message + .muteuser [time]\n• Mention @user + .muteuser [time]\n\nTime: 5m 30m 1h 2h (blank = permanent)\n\nExample: .muteuser 30m"
      })
    }
    const targetNum = getNum(target)
    const cfg = require("../../lib/vconfig")
    if (targetNum === cfg.ownerNumber) return sock.sendMessage(jid, { text: "❌ Cannot mute the owner!" })
    if (isPaired(target)) return sock.sendMessage(jid, { text: "❌ Cannot mute a paired user!" })
    // Use number-based key for consistency with handler
    const targetJid = targetNum + "@s.whatsapp.net"
    const muteKey   = jid + targetJid
    const timeArg   = args.find(a => /^\d+[mh]$/.test(a))
    let duration = -1, durText = "permanently"
    if (timeArg) {
      const val = parseInt(timeArg), unit = timeArg.slice(-1)
      duration = unit === "h" ? val * 3600000 : val * 60000
      durText  = val + (unit === "h" ? " hour(s)" : " minute(s)")
    }
    if (global.mutedUsers[muteKey]?.timeoutId) clearTimeout(global.mutedUsers[muteKey].timeoutId)
    const until = duration === -1 ? -1 : Date.now() + duration
    global.mutedUsers[muteKey] = { until, timeoutId: null }
    if (duration > 0) {
      const tid = setTimeout(() => {
        delete global.mutedUsers[muteKey]
        sock.sendMessage(jid, { text: "🔊 @" + targetNum + " unmuted (time expired)", mentions: [targetJid] }).catch(() => {})
      }, duration)
      global.mutedUsers[muteKey].timeoutId = tid
    }
    console.log("🔇 Muted:", targetNum, "in", jid, "for", durText, "| Key:", muteKey)
    await sock.sendMessage(jid, {
      text: "🔇 *@" + targetNum + " muted " + durText + "!*\n\nTheir messages will be deleted." + (duration === -1 ? "\n\nUse .unmuteuser to unmute." : ""),
      mentions: [targetJid]
    })
  }
}
