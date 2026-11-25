module.exports = {
  name: "getgrouppp",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid
    if (!jid.endsWith("@g.us")) return sock.sendMessage(jid, { text: "❌ Groups only!" })
    try {
      const pp = await sock.profilePictureUrl(jid, "image")
      const axios = require("axios")
      const r = await axios.get(pp, { responseType:"arraybuffer", timeout:15000 })
      const meta = await sock.groupMetadata(jid)
      await sock.sendMessage(jid, {
        image: Buffer.from(r.data),
        caption: "🖼️ *Group Profile Picture*\n\n📋 Group: *" + meta.subject + "*\n\n_Powered by VECTOR MD_"
      })
    } catch(e) { sock.sendMessage(jid, { text: "❌ Failed to get group PP: " + e.message }) }
  }
}
