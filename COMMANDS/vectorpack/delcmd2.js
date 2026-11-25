const { isPaired } = require("../../lib/auth")
module.exports = {
  name: "delcmd",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    if (!isPaired(sender)) return sock.sendMessage(jid, { text: "❌ Paired users only!" })
    const ctx    = msg.message?.extendedTextMessage?.contextInfo
    const quoted = ctx?.quotedMessage
    const stkMsg = quoted?.stickerMessage
    if (!stkMsg) return sock.sendMessage(jid, { text: "↩️ Reply to a sticker with .delcmd to remove its command" })
    const stickerKey = stkMsg.fileSha256?.toString("base64")
    if (!stickerKey) return sock.sendMessage(jid, { text: "❌ Could not identify sticker." })
    if (global.stickerCmds?.[stickerKey]) {
      delete global.stickerCmds[stickerKey]
      if (global.saveState) global.saveState()
      await sock.sendMessage(jid, { text: "✅ Sticker command removed!" })
    } else {
      sock.sendMessage(jid, { text: "❌ No command set for this sticker." })
    }
  }
}
