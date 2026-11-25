module.exports = {
  name: "listadmins",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid
    if (!jid.endsWith("@g.us")) return sock.sendMessage(jid, { text: "❌ Groups only!" })
    try {
      const meta = await sock.groupMetadata(jid)
      const admins = meta.participants.filter(p=>p.admin)
      const list = admins.map((a,i)=>`${i+1}. @${a.id.split("@")[0]} ${a.admin==="superadmin"?"👑":"⭐"}`).join("\n")
      sock.sendMessage(jid, { text: `👑 *Group Admins (${admins.length})*\n\n${list}`, mentions: admins.map(a=>a.id) })
    } catch { sock.sendMessage(jid, { text: "❌ Failed." }) }
  }
}
