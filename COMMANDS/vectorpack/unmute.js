module.exports = {
  name: "unmute",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid
    if (!jid.endsWith("@g.us")) return sock.sendMessage(jid, {text:"❌ Groups only!"})
    try {
      await sock.groupSettingUpdate(jid, "not_announcement")
      sock.sendMessage(jid, {text:"🔊 Group unmuted. Everyone can send messages."})
    } catch { sock.sendMessage(jid, {text:"❌ Need admin rights to unmute."}) }
  }
}