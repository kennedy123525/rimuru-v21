const dl = require("../../lib/downloader")

module.exports = {
  name: "ytmp4",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    let q = args.join(" ").trim()
    if (!q) return sock.sendMessage(jid, { text: "🎬 Usage: .ytmp4 <youtube_url or video name>\nAdd *hd* for 720p (bigger file)" })
    let maxQ = "360p"
    if (/\bhd\b|720/i.test(q)) { maxQ = "720p"; q = q.replace(/\bhd\b/i, "").trim() }
    await sock.sendMessage(jid, { react: { text: "⏳", key: msg.key } })
    await sock.sendMessage(jid, { text: "🎬 Fetching video (" + maxQ + ")..." })
    try {
      const vid = await dl.ytVideo(q, maxQ)
      await sock.sendMessage(jid, { text: "⬇️ Downloading: *" + vid.title + "*..." })
      await sock.sendMessage(jid, { video: vid.buffer, mimetype: vid.mimetype, caption: "🎬 *" + vid.title + "*\n\n_Powered by VECTOR MD_" }, { quoted: msg })
      await sock.sendMessage(jid, { react: { text: "✅", key: msg.key } })
    } catch (e) {
      await sock.sendMessage(jid, { react: { text: "❌", key: msg.key } })
      await sock.sendMessage(jid, { text: "❌ ytmp4 failed: " + e.message + "\n\n💡 360p is the default so files stay sendable - try `.ytmp4 <link> hd`" })
    }
  }
}
