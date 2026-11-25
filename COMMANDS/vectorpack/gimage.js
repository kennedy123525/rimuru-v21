const dl = require("../../lib/downloader")

module.exports = {
  name: "gimage",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    const query = args.join(" ").trim()
    if (!query) return sock.sendMessage(jid, { text: "Usage: .gimage <search>\nExample: .gimage sunset beach" })
    await sock.sendMessage(jid, { react: { text: "🔍", key: msg.key } })
    try {
      const urls = await dl.imageSearch(query)
      let sent = 0
      for (const u of urls.slice(0, 3)) {
        try {
          // wikimedia hosts require the policy-compliant UA for media downloads too
          const buf = await dl.dlBuffer(u, { timeout: 30000, minBytes: 3000, headers: { "User-Agent": dl.WIKI_UA } })
          await sock.sendMessage(jid, { image: buf, caption: sent === 0 ? "🖼️ *" + query + "*\n\n_Powered by VECTOR MD_" : "🖼️ " + query })
          sent++
        } catch {}
      }
      if (!sent) throw new Error("could not download any image")
      await sock.sendMessage(jid, { react: { text: "✅", key: msg.key } })
    } catch (e) {
      await sock.sendMessage(jid, { react: { text: "❌", key: msg.key } })
      await sock.sendMessage(jid, { text: "❌ Image search failed: " + e.message + "\n\n💡 Try a different keyword." })
    }
  }
}
