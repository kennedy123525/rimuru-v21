const { downloadMediaMessage } = require("@whiskeysockets/baileys")
module.exports = {
  name: "setppgc",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid
    if (!jid.endsWith("@g.us")) return sock.sendMessage(jid, { text: "❌ Groups only! Send an image with .setppgc" })
    const imgMsg = msg.message?.imageMessage || msg.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage
    if (!imgMsg) return sock.sendMessage(jid, { text: "Send an image with caption .setppgc to set it as group photo." })
    try {
      const buf = await downloadMediaMessage(msg, "buffer", {})
      await sock.updateProfilePicture(jid, buf)
      sock.sendMessage(jid, { text: "✅ Group photo updated!" })
    } catch (e) { sock.sendMessage(jid, { text: "❌ Failed: " + e.message + "\nMake sure I'm admin." }) }
  }
}
