module.exports = {
  name: "groupinfo",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid
    if (!jid.endsWith("@g.us")) return sock.sendMessage(jid, { text: "❌ Groups only!" })
    try {
      const meta    = await sock.groupMetadata(jid)
      const { getNum } = require("../../lib/auth")
      const botNum  = getNum(sock.user?.id || "")
      const me      = meta.participants.find(p => getNum(p.id) === botNum)
      const admins  = meta.participants.filter(p => p.admin).length
      const members = meta.participants.length
      const created = meta.creation ? new Date(meta.creation * 1000).toLocaleDateString("en-GB",{timeZone:"Europe/Madrid"}) : "Unknown"
      const text =
        "👥 *Group Info*\n\n" +
        "📋 Name: *" + meta.subject + "*\n" +
        "🆔 JID: `" + jid + "`\n" +
        "👥 Members: *" + members + "*\n" +
        "⭐ Admins: *" + admins + "*\n" +
        "📅 Created: *" + created + "*\n" +
        "🤖 Bot role: *" + (me?.admin === "superadmin" ? "Creator" : me?.admin ? "Admin" : "Member") + "*\n" +
        (meta.desc ? "\n📝 Description:\n_" + meta.desc.slice(0,200) + "_\n" : "") +
        "\n_Powered by VECTOR MD_"
      // Try to get group picture
      try {
        const pp = await sock.profilePictureUrl(jid, "image")
        const axios = require("axios")
        const r = await axios.get(pp, { responseType:"arraybuffer", timeout:10000 })
        await sock.sendMessage(jid, { image: Buffer.from(r.data), caption: text })
      } catch { await sock.sendMessage(jid, { text }) }
    } catch(e) { sock.sendMessage(jid, { text: "❌ Failed: " + e.message }) }
  }
}
