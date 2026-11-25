const dl = require("../../lib/downloader")

module.exports = {
  name: "tt",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    const input = args.join(" ").trim()
    if (!input) return sock.sendMessage(jid, {
      text: "🎵 *TikTok Downloader*\n\n• .tt <link> - download video\n• .tt <search> - search and download\n\nExample: .tt https://vt.tiktok.com/xxx"
    })
    await sock.sendMessage(jid, { react: { text: "⏳", key: msg.key } })
    await sock.sendMessage(jid, { text: "⏳ Processing TikTok..." })

    const fmt = (n) => (n || 0).toLocaleString()
    const urlRegex = /(https:\/\/(vt|vm)\.tiktok\.com\/[^\s]+|https:\/\/www\.tiktok\.com\/@[\w.-]+\/video\/\d+)/

    try {
      const parsedUrl = input.match(urlRegex)?.[0]
      if (!parsedUrl) return sock.sendMessage(jid, {
        text: "❌ That's not a TikTok link.\n\nSend a link like:\n• https://vt.tiktok.com/xxxxx\n• https://www.tiktok.com/@user/video/123456"
      })

      const d = await dl.tiktokDl(parsedUrl)
      const header = "🎵 *TIKTOK*" +
        (d.author ? "\n👤 @" + d.author : "") +
        (d.title ? "\n📌 " + d.title.slice(0, 120) : "") +
        "\n\n_Powered by VECTOR MD_"

      if (d.images.length) {
        // photo slideshow post
        await sock.sendMessage(jid, { text: "🖼️ Photo post - sending " + Math.min(d.images.length, 5) + " images..." })
        for (const img of d.images.slice(0, 5)) {
          try {
            const buf = await dl.dlBuffer(img, { timeout: 40000 })
            await sock.sendMessage(jid, { image: buf, caption: header })
          } catch {}
        }
        if (d.audio) {
          try {
            const ab = await dl.dlBuffer(d.audio, { timeout: 60000 })
            await sock.sendMessage(jid, { audio: ab, mimetype: "audio/mpeg", ptt: false }, { quoted: msg })
          } catch {}
        }
      } else {
        const vurl = d.videos[0]
        await sock.sendMessage(jid, { text: "⬇️ Downloading video..." })
        try {
          const buf = await dl.dlBuffer(vurl, { timeout: 120000, maxBytes: 120 * 1024 * 1024 })
          if (buf.length < 10000) throw new Error("video file empty")
          await sock.sendMessage(jid, { video: buf, mimetype: "video/mp4", caption: header }, { quoted: msg })
        } catch (e) {
          // video too big / dead link -> try audio as consolation
          if (d.audio) {
            const ab = await dl.dlBuffer(d.audio, { timeout: 60000 }).catch(() => null)
            if (ab) {
              await sock.sendMessage(jid, { audio: ab, mimetype: "audio/mpeg", ptt: false }, { quoted: msg })
              await sock.sendMessage(jid, { text: "⚠️ Video too big to send - sent the audio track instead." })
            } else throw e
          } else throw e
        }
      }

      await sock.sendMessage(jid, { react: { text: "✅", key: msg.key } })
    } catch (e) {
      await sock.sendMessage(jid, { react: { text: "❌", key: msg.key } })
      await sock.sendMessage(jid, { text: "❌ TikTok failed: " + e.message })
    }
  }
}
