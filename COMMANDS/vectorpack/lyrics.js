const dl = require("../../lib/downloader")

module.exports = {
  name: "lyrics",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    const query = args.join(" ").trim()
    if (!query) return sock.sendMessage(jid, { text: "Usage: .lyrics <song name>\nExample: .lyrics shape of you ed sheeran" })
    await sock.sendMessage(jid, { react: { text: "🔍", key: msg.key } })
    await sock.sendMessage(jid, { text: "🔍 Searching lyrics..." })

    // parse "song by artist" / "song - artist"
    let title = query, artist = ""
    const m = query.match(/^(.+?)\s+(?:by|-)\s+(.+)$/i)
    if (m) { title = m[1].trim(); artist = m[2].trim() }

    try {
      const r = await dl.lyricsDl(title, artist)
      const text = r.lyrics.length > 3500 ? r.lyrics.slice(0, 3500) + "\n\n_(truncated)_" : r.lyrics
      await sock.sendMessage(jid, { text: "🎵 *" + (r.title || title) + "*" + (r.artist ? " — " + r.artist : "") + "\n\n" + text })
      await sock.sendMessage(jid, { react: { text: "✅", key: msg.key } })
    } catch (e) {
      await sock.sendMessage(jid, { react: { text: "❌", key: msg.key } })
      await sock.sendMessage(jid, { text: "❌ Lyrics not found.\n\n💡 Try with the artist: `.lyrics shape of you by ed sheeran`" })
    }
  }
}
