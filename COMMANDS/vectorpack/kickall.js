const { isPaired, getNum } = require("../../lib/auth")
module.exports = {
  name: "kickall",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    if (!jid.endsWith("@g.us")) return sock.sendMessage(jid, { text: "❌ Groups only!" })
    if (!isPaired(sender)) return sock.sendMessage(jid, { text: "❌ Paired users only!" })
    const cfg = require("../../lib/vconfig")
    try {
      const meta    = await sock.groupMetadata(jid)
      const botNum  = getNum(sock.user?.id || "")
      const senderN = getNum(sender)
      // Exclude: bot itself, owner, sender, paired users
      const toKick = meta.participants.filter(p => {
        const pNum = getNum(p.id)
        return pNum !== botNum &&
               pNum !== cfg.ownerNumber &&
               pNum !== senderN &&
               !(global.pairedUsers||[]).some(u => getNum(u) === pNum)
      }).map(p => p.id)
      if (!toKick.length) return sock.sendMessage(jid, { text: "ℹ️ No members to kick!" })
      await sock.sendMessage(jid, { text: "⏳ Kicking " + toKick.length + " members..." })
      // Kick in batches to avoid rate limits
      const BATCH = 5
      for (let i = 0; i < toKick.length; i += BATCH) {
        const batch = toKick.slice(i, i + BATCH)
        await sock.groupParticipantsUpdate(jid, batch, "remove").catch(()=>{})
        if (i + BATCH < toKick.length) await new Promise(r => setTimeout(r, 1500))
      }
      await sock.sendMessage(jid, { text: "✅ Kicked " + toKick.length + " members!\n\n_Owner, you, and paired users were kept._\n_Powered by VECTOR MD_" })
    } catch(e) { sock.sendMessage(jid, { text: "❌ Failed: " + e.message }) }
  }
}
