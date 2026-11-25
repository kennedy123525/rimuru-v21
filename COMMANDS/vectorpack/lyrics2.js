const dl = require("../../lib/downloader")

module.exports = {
  name: "songlyrics",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    const q = args.join(" ").trim()
    if (!q) return sock.sendMessage(jid, { text: "Usage: .songlyrics <artist - song>\nExample: .songlyrics Wizkid Essence" })
    await sock.sendMessage(jid, { text: "🔍 Searching lyrics..." })
    // expected format "artist - song"; accept "song by artist" too
    let artist = "", title = q
    let m = q.match(/^(.+?)\s+-\s+(.+)$/)
    if (m) { artist = m[1].trim(); title = m[2].trim() }
    else { m = q.match(/^(.+?)\s+by\s+(.+)$/i); if (m) { title = m[1].trim(); artist = m[2].trim() } }
    try {
      const r = await dl.lyricsDl(title, artist)
      const text = r.lyrics.length > 2500 ? r.lyrics.slice(0, 2500) + "...\n\n_(truncated)_" : r.lyrics
      await sock.sendMessage(jid, { text: "🎵 *" + (r.title || title) + "*\n👤 " + (r.artist || artist || "?") + "\n\n" + text })
    } catch (e) {
      await sock.sendMessage(jid, { text: "❌ Lyrics not found: " + e.message })
    }
  }
}
