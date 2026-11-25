const { getNum, isPaired, isOwner } = require("../../lib/auth")
module.exports = {
  name: "whoami",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    const cfg = require("../../lib/vconfig")
    // Get real sender number
    const sNum = getNum(sender)
    const isOwnerUser  = sNum === cfg.ownerNumber
    const isPairedUser = !isOwnerUser && (global.pairedUsers||[]).some(u => getNum(u) === sNum)
    const isRegular    = !isOwnerUser && !isPairedUser
    
    let roleText, accessText, badgeText
    if (isOwnerUser) {
      roleText   = "👑 *Bot Owner* (CHAD FDEV)"
      accessText = "✅ Full unrestricted access"
      badgeText  = "🔑 OWNER"
    } else if (isPairedUser) {
      roleText   = "✅ *Paired User*"
      accessText = "✅ Full bot access (all commands)"
      badgeText  = "🔐 PAIRED"
    } else {
      roleText   = "👤 *Regular User*"
      accessText = "⚠️ Limited (group commands only)"
      badgeText  = "👤 GUEST"
    }

    await sock.sendMessage(jid, {
      text: "👤 *Who Am I?*\n\n" +
            "╔════════════════╗\n" +
            "║  " + badgeText + "\n" +
            "╚════════════════╝\n\n" +
            "📞 Number: *+" + sNum + "*\n" +
            (msg.pushName ? "🏷️ Name: *" + msg.pushName + "*\n" : "") +
            "🎭 Role: " + roleText + "\n" +
            "🔑 Access: " + accessText + "\n" +
            "🔧 Prefix: *" + (global.currentPrefix||".") + "*\n" +
            "🤖 Bot: *VECTOR MD v2.0*\n\n" +
            (isRegular ? "_Contact the owner to get paired for full access!_" : "_Welcome to VECTOR MD! 🔥_") +
            "\n\n_Powered by VECTOR MD_"
    })
  }
}
