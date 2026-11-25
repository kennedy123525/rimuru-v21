const dl = require("../../lib/downloader")

module.exports = {
  name: "facebook",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    const url = args[0]
    if (!url || !/facebook\.com|fb\.watch/i.test(url)) return sock.sendMessage(jid, {
      text: "Usage: .facebook <facebook video url>\n\nExample:\n.facebook https://www.facebook.com/watch/?v=123456\n.facebook https://fb.watch/xxxxx"
    })
    await sock.sendMessage(jid, { react: { text: "⏳", key: msg.key } })
    await sock.sendMessage(jid, { text: "⏳ Downloading from Facebook..." })
    try {
      const r = await dl.facebookDl(url)
      const buf = await dl.dlBuffer(r.video, { timeout: 120000, maxBytes: 120 * 1024 * 1024 })
      await sock.sendMessage(jid, { video: buf, mimetype: "video/mp4", caption: "📘 Facebook" + (r.title ? " | " + r.title.slice(0, 80) : "") + "\n\n_Powered by VECTOR MD_" }, { quoted: msg })
      await sock.sendMessage(jid, { react: { text: "✅", key: msg.key } })
    } catch (e) {
      await sock.sendMessage(jid, { react: { text: "❌", key: msg.key } })
      await sock.sendMessage(jid, { text: "❌ Facebook failed: " + e.message })
    }
  }
}
