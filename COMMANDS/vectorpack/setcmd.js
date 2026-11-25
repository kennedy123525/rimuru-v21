const { isPaired } = require("../../lib/auth")
module.exports = {
  name: "setcmd",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    if (!isPaired(sender)) return sock.sendMessage(jid, { text: "❌ Paired users only!" })
    const ctx    = msg.message?.extendedTextMessage?.contextInfo
    const quoted = ctx?.quotedMessage
    const stkMsg = quoted?.stickerMessage || msg.message?.stickerMessage
    if (!stkMsg) return sock.sendMessage(jid, {
      text: "↩️ Reply to a sticker with .setcmd <command>\nExample: .setcmd ping\n\nTip: Forward the sticker to yourself first, then reply."
    })
    const cmdName = args[0]?.toLowerCase()
    if (!cmdName) return sock.sendMessage(jid, { text: "Usage: .setcmd <command name>\nExample: .setcmd ping" })
    // Generate multiple possible keys
    if (!global.stickerCmds) global.stickerCmds = {}
    const sha = stkMsg.fileSha256
    const enc = stkMsg.fileEncSha256
    const med = stkMsg.mediaKey
    const msgId = ctx?.stanzaId || msg.key.id
    // Store with ALL possible keys for maximum detection
    const keys = []
    if (sha) keys.push(Buffer.isBuffer(sha) ? sha.toString("hex") : sha)
    if (enc) keys.push(Buffer.isBuffer(enc) ? enc.toString("hex") : enc)
    if (med) keys.push(Buffer.isBuffer(med) ? med.toString("hex").slice(0,32) : String(med).slice(0,32))
    if (msgId) keys.push("msgid_" + msgId)
    if (!keys.length) return sock.sendMessage(jid, { text: "❌ Could not identify sticker. Try forwarding it first." })
    for (const k of keys) { global.stickerCmds[k] = cmdName }
    if (global.saveState) global.saveState()
    const keyPreview = keys[0]?.slice(0,16) || "?"
    console.log("✅ Sticker cmd:", keys.length, "keys stored ->", cmdName)
    await sock.sendMessage(jid, {
      text: "✅ *Sticker command set!*\n\n🎭 Sticker → *." + cmdName + "*\n📊 Keys stored: " + keys.length + "\n\nSend that sticker to trigger *." + cmdName + "*!"
    })
  }
}
