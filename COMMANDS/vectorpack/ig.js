const dl = require("../../lib/downloader")

module.exports = {
  name: "ig",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    const input = args.join(" ").trim()
    const parsedUrl = input.match(/(https?:\/\/(?:www\.)?instagram\.com\/(?:p|reel|reels|tv)\/[a-zA-Z0-9_-]+)/)?.[0]
    if (!parsedUrl) return sock.sendMessage(jid, {
      text: "📸 *Instagram Downloader*\n\nUsage: .ig <instagram_url>\n\nExample:\n.ig https://www.instagram.com/p/xxxxx\n.ig https://www.instagram.com/reel/xxxxx"
    })
    await sock.sendMessage(jid, { react: { text: "⏳", key: msg.key } })
    await sock.sendMessage(jid, { text: "⏳ Downloading Instagram..." })

    try {
      const r = await dl.instagramDl(parsedUrl)
      if (r.video) {
        await sock.sendMessage(jid, { text: "⬇️ Downloading video..." })
        const buf = await dl.dlBuffer(r.video, { timeout: 120000, maxBytes: 120 * 1024 * 1024 })
        await sock.sendMessage(jid, { video: buf, mimetype: "video/mp4", caption: "📸 Instagram" + (r.title ? " | " + r.title.slice(0, 80) : "") + "\n\n_Powered by VECTOR MD_" }, { quoted: msg })
      } else if (r.image) {
        const buf = await dl.dlBuffer(r.image, { timeout: 60000 })
        await sock.sendMessage(jid, { image: buf, caption: "📸 Instagram\n\n_Powered by VECTOR MD_" }, { quoted: msg })
      } else {
        throw new Error("no media found in the post")
      }
      await sock.sendMessage(jid, { react: { text: "✅", key: msg.key } })
    } catch (e) {
      await sock.sendMessage(jid, { react: { text: "❌", key: msg.key } })
      await sock.sendMessage(jid, { text: "❌ IG failed: " + e.message + "\n\n💡 Private posts can't be downloaded - make sure the post is public." })
    }
  }
}
