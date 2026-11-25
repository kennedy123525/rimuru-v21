const dl = require("../../lib/downloader")

module.exports = {
  name: "movie",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    const query = args.join(" ").trim()
    if (!query) return sock.sendMessage(jid, { text: "Usage: .movie <movie name>\nExample: .movie Inception" })
    await sock.sendMessage(jid, { react: { text: "🔍", key: msg.key } })
    try {
      const results = await dl.movieSearch(query)
      if (!results.length) return sock.sendMessage(jid, { text: "❌ Movie not found: " + query })
      const top = results[0]
      const list = results.map((m, i) => (i + 1) + ". *" + m.title + "*" + (m.year ? " (" + m.year + ")" : "")).join("\n")
      const txt = "🎬 *" + top.title + "*" + (top.year ? " (" + top.year + ")" : "") +
        (top.rating ? "\n⭐ " + top.rating : "") +
        (top.type ? "\n📺 " + top.type : "") +
        (top.description ? "\n\n📝 " + top.description : "") +
        "\n\n🔎 Other results:\n" + list
      if (top.poster) {
        try {
          const buf = await dl.dlBuffer(top.poster, { timeout: 20000, minBytes: 1000 })
          return sock.sendMessage(jid, { image: buf, caption: txt }, { quoted: msg })
        } catch {}
      }
      await sock.sendMessage(jid, { text: txt }, { quoted: msg })
    } catch (e) {
      await sock.sendMessage(jid, { react: { text: "❌", key: msg.key } })
      await sock.sendMessage(jid, { text: "❌ Movie search failed: " + e.message })
    }
  }
}
