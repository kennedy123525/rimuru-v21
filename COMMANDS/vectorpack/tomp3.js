const { downloadContentFromMessage } = require("@whiskeysockets/baileys")
const fs   = require("fs")
const path = require("path")
const os   = require("os")
module.exports = {
  name: "tomp3",
  async execute(sock, msg, args) {
    const jid    = msg.key.remoteJid
    const ctx    = msg.message?.extendedTextMessage?.contextInfo
    const quoted = ctx?.quotedMessage
    const vidMsg = msg.message?.videoMessage || quoted?.videoMessage
    if (!vidMsg) return sock.sendMessage(jid, { text: "📌 Reply to a video with .tomp3 to convert it to MP3!" })
    await sock.sendMessage(jid, { react: { text: "⏳", key: msg.key } })
    await sock.sendMessage(jid, { text: "⏳ Converting video to MP3..." })
    try {
      const stream = await downloadContentFromMessage(vidMsg, "video")
      const chunks = []; for await (const c of stream) chunks.push(c)
      const vidBuf = Buffer.concat(chunks)
      const tmpIn  = path.join(os.tmpdir(), "tomp3_" + Date.now() + ".mp4")
      const tmpOut = path.join(os.tmpdir(), "tomp3_" + Date.now() + ".mp3")
      fs.writeFileSync(tmpIn, vidBuf)
      await new Promise((res, rej) => require("child_process").exec(
        `ffmpeg -y -i "${tmpIn}" -vn -acodec libmp3lame -q:a 2 "${tmpOut}"`,
        { timeout: 60000 }, (err) => err ? rej(err) : res()
      ))
      const mp3Buf = fs.readFileSync(tmpOut)
      for (const f of [tmpIn, tmpOut]) { try { fs.unlinkSync(f) } catch {} }
      await sock.sendMessage(jid, { audio: mp3Buf, mimetype: "audio/mpeg", ptt: false, fileName: "video_to_mp3.mp3" }, { quoted: msg })
      await sock.sendMessage(jid, { react: { text: "✅", key: msg.key } })
    } catch(e) {
      await sock.sendMessage(jid, { react: { text: "❌", key: msg.key } })
      await sock.sendMessage(jid, { text: "❌ Conversion failed: " + e.message + "\n\n💡 ffmpeg must be installed on the server" })
    }
  }
}
