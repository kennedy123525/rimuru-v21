const dl = require("../../lib/downloader")

module.exports = {
  name: "ytmp3",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    const q   = args.join(" ").trim()
    if (!q) return sock.sendMessage(jid, { text: "🎵 Usage: .ytmp3 <youtube_url or song name>" })
    await sock.sendMessage(jid, { react: { text: "⏳", key: msg.key } })
    await sock.sendMessage(jid, { text: "🎵 Fetching audio..." })
    try {
      const audio = await dl.ytAudio(q)
      await sock.sendMessage(jid, { text: "⬇️ Downloading: *" + audio.title + "*..." })
      const clean = audio.title.replace(/[^\w\s\-]/g, "").trim().slice(0, 60) || "audio"
      await sock.sendMessage(jid, {
        audio: audio.buffer, mimetype: audio.mimetype, ptt: false,
        fileName: clean + "." + audio.ext
      }, { quoted: msg })
      await sock.sendMessage(jid, { react: { text: "✅", key: msg.key } })
      await sock.sendMessage(jid, { text: "✅ *" + audio.title + "*\n🎵 Enjoy!\n\n_Powered by VECTOR MD_" })
    } catch (e) {
      await sock.sendMessage(jid, { react: { text: "❌", key: msg.key } })
      await sock.sendMessage(jid, { text: "❌ ytmp3 failed: " + e.message + "\n\n💡 Try: .ytmp3 <youtube_link>" })
    }
  }
}
