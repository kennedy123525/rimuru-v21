module.exports = {
  name: "members",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid
    if (!jid.endsWith("@g.us")) return sock.sendMessage(jid, {text:"❌ Groups only!"})
    try {
      const meta = await sock.groupMetadata(jid)
      const list = meta.participants.map((p,i)=>`${i+1}. @${p.id.split("@")[0]}${p.admin?" 👑":""}`).join("\n")
      sock.sendMessage(jid, {text:`👥 *Members (${meta.participants.length})*\n\n${list}`, mentions: meta.participants.map(p=>p.id)})
    } catch { sock.sendMessage(jid, {text:"❌ Failed to get members."}) }
  }
}