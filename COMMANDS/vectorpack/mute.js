module.exports = {
  name: "mute",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid
    if (!jid.endsWith("@g.us")) return sock.sendMessage(jid, {text:"❌ Groups only!"})
    try {
      await sock.groupSettingUpdate(jid, "announcement")
      sock.sendMessage(jid, {text:"🔇 Group muted. Only admins can send messages."})
    } catch { sock.sendMessage(jid, {text:"❌ Need admin rights to mute."}) }
  }
}