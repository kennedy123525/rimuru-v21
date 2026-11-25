const dl = require("../../lib/downloader")

module.exports = {
  name: "play",
  async execute(sock, msg, args) {
    const jid   = msg.key.remoteJid
    const query = args.join(" ").trim()
    if (!query) return sock.sendMessage(jid, {
      text: "🎵 Usage: .play <song name>\nExample: .play Essence Wizkid"
    })

    await sock.sendMessage(jid, { react: { text: "🔍", key: msg.key } })
    await sock.sendMessage(jid, { text: "🔍 Searching: *" + query + "*..." })

    let audio = null
    try {
      audio = await dl.ytAudio(query)
    } catch (e) {
      await sock.sendMessage(jid, { react: { text: "❌", key: msg.key } })
      return sock.sendMessage(jid, {
        text: "❌ Could not download *" + query + "*\n\n" +
              "💡 Tips:\n• Add artist name: `.play Essence Wizkid`\n" +
              "• Try full title\n• Use `.ytmp3 <youtube_url>` with a direct link\n\n⚠️ " + e.message
      })
    }

    try {
      await sock.sendMessage(jid, { text: "⬇️ Got it — sending *" + audio.title + "*..." })
      await sock.sendMessage(jid, { react: { text: "⬇️", key: msg.key } })

      const clean = audio.title.replace(/[^\w\s\-]/g, "").trim().slice(0, 60) || query

      await sock.sendMessage(jid, {
        audio: audio.buffer, mimetype: audio.mimetype, ptt: false,
        fileName: clean + "." + audio.ext
      }, { quoted: msg })

      await sock.sendMessage(jid, { react: { text: "✅", key: msg.key } })
      await sock.sendMessage(jid, { text: "✅ *" + audio.title + "*\n🎵 Enjoy!\n\n_Powered by VECTOR MD_" })
    } catch (e) {
      await sock.sendMessage(jid, { react: { text: "❌", key: msg.key } })
      await sock.sendMessage(jid, { text: "❌ Send failed: " + e.message })
    }
  }
}
