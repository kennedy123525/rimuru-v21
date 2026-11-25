module.exports = {
  name: "groupstats",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid
    if (!jid.endsWith("@g.us")) return sock.sendMessage(jid, { text: "❌ Groups only!" })
    try {
      const meta = await sock.groupMetadata(jid)
      const admins = meta.participants.filter(p=>p.admin).length
      const members = meta.participants.length
      const regular = members - admins
      const protection = []
      if (global.antiSpam[jid]) protection.push("Anti-spam ✅")
      if (global.antiTag[jid]) protection.push("Anti-tag ✅")
      if (global.antiBadWord[jid]) protection.push("Anti-badword ✅")
      if (global.antiBot[jid]) protection.push("Anti-bot ✅")
      if (global.antiMention[jid]) protection.push("Anti-mention ✅")
      sock.sendMessage(jid, { text: "📊 *Group Statistics*\n\n📌 Name: " + meta.subject + "\n👥 Total: " + members + "\n👑 Admins: " + admins + "\n👤 Members: " + regular + "\n\n🛡️ *Active Protection:*\n" + (protection.join("\n") || "None") })
    } catch { sock.sendMessage(jid, { text: "❌ Failed." }) }
  }
}
