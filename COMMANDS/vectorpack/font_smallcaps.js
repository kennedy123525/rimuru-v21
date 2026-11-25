/**
 * .smallcaps — sᴍᴀʟʟᴄᴀᴘs text style
 */
module.exports = {
  name: "smallcaps",
  category: "unicode",
  description: "Convert text to smallcaps style",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    const text = args.join(" ").trim()
    if (!text) return sock.sendMessage(jid, { text: "🔤 Usage: .smallcaps <text>" }, { quoted: msg })
    const out = (t => t.replace(/[A-Za-z]/g, c => {
      const SC = "ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘQʀꜱᴛᴜᴠᴡxʏᴢ"
      const i = c.toLowerCase().charCodeAt(0) - 97
      return i >= 0 && i < 26 ? SC[i] : c
    }))(text)
    await sock.sendMessage(jid, { text: out }, { quoted: msg })
  },
}
