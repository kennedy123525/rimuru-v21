const dl = require("../../lib/downloader")

module.exports = {
  name: "spotify",
  async execute(sock, msg, args) {
    const jid   = msg.key.remoteJid
    const query = args.join(" ").trim()
    if (!query) return sock.sendMessage(jid, { text: "🎵 Usage: .spotify <song name or spotify track url>\nExample: .spotify Alone Alan Walker" })
    await sock.sendMessage(jid, { text: "🎵 *Spotify:* _" + query + "_..." })
    try {
      let track = null, usedFallback = false
      if (/open\.spotify\.com/i.test(query)) {
        track = await dl.spotifyDl(query)
        track.title = track.title || query
      } else {
        const found = await dl.spotifySearch(query)
        if (found?.url) {
          await sock.sendMessage(jid, { text: "📀 Found: *" + found.title + "*" + (found.artist ? " by *" + found.artist + "*" : "") + "\n⬇️ Downloading..." })
          const d = await dl.spotifyDl(found.url)
          track = { ...d, title: d.title || found.title, artist: d.artist || found.artist }
        } else {
          // spotify search backends down - deliver the same song via the youtube pipeline
          usedFallback = true
          const audio = await dl.ytAudio(query)
          track = { title: audio.title, artist: "", url: null, buffer: audio.buffer, mimetype: audio.mimetype, ext: audio.ext }
        }
      }
      if (!track.buffer) {
        const buf = await dl.dlBuffer(track.url, { timeout: 150000 })
        track.buffer = buf
        track.mimetype = "audio/mpeg"
        track.ext = "mp3"
      }
      await sock.sendMessage(jid, {
        audio: track.buffer, mimetype: track.mimetype || "audio/mpeg", ptt: false,
        fileName: ((track.title || "spotify") + (track.artist ? " - " + track.artist : "")).slice(0, 60) + "." + (track.ext || "mp3")
      }, { quoted: msg })
      await sock.sendMessage(jid, { react: { text: "✅", key: msg.key } })
      await sock.sendMessage(jid, { text: "✅ *" + track.title + "*" + (track.artist ? " — " + track.artist : "") + "\n🎧 _Powered by VECTOR MD_" + (usedFallback ? "\n_(spotify backend was down - pulled the same track via youtube)_" : "") })
    } catch (e) {
      await sock.sendMessage(jid, { react: { text: "❌", key: msg.key } })
      await sock.sendMessage(jid, { text: "❌ Spotify failed: " + e.message })
    }
  }
}
