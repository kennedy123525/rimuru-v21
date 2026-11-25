const axios = require("axios")
const { isPaired } = require("../../lib/auth")
module.exports = {
  name: "ssweb",
  async execute(sock, msg, args, sender) {
    const jid    = msg.key.remoteJid
    if (!isPaired(sender)) return sock.sendMessage(jid, { text: "❌ Paired users only!" })
    const url    = args[0]
    const device = (args[1]||"desktop").toLowerCase()
    if (!url || !url.startsWith("http")) return sock.sendMessage(jid, {
      text: "🖼️ Usage: .ssweb <url> [phone/laptop]\nExample:\n.ssweb https://google.com phone\n.ssweb https://google.com laptop"
    })
    await sock.sendMessage(jid, { text: "📸 Taking screenshot of " + url + " (" + device + " view)..." })
    try {
      const isMobile = device === "phone" || device === "mobile"
      const width  = isMobile ? 390 : 1280
      const height = isMobile ? 844 : 800
      const ua     = isMobile
        ? "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1"
        : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36"
      // Try multiple screenshot APIs
      const apis = [
        `https://api.screenshotone.com/take?url=${encodeURIComponent(url)}&viewport_width=${width}&viewport_height=${height}&format=jpg&quality=80&delay=1`,
        `https://s0.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=${width}&h=${height}`,
        `https://api.apiflash.com/v1/urltoimage?url=${encodeURIComponent(url)}&width=${width}&height=${height}&format=jpeg&delay=1000`,
        `https://mini.s-shot.ru/${width}x${height}/JPEG/1024/?${url}`,
      ]
      let imgBuf = null
      for (const apiUrl of apis) {
        try {
          const r = await axios.get(apiUrl, { timeout:25000, responseType:"arraybuffer", headers:{"User-Agent":ua} })
          if (r.data?.byteLength > 1000) { imgBuf = Buffer.from(r.data); break }
        } catch {}
      }
      if (!imgBuf) throw new Error("All screenshot APIs failed")
      await sock.sendMessage(jid, {
        image: imgBuf,
        caption: "📸 *Screenshot: " + url + "*\n" +
                 "📱 View: " + (isMobile ? "Mobile/Phone" : "Desktop/Laptop") + "\n" +
                 "📐 Size: " + width + "x" + height + "\n\n_Powered by VECTOR MD_"
      }, { quoted: msg })
    } catch(e) { sock.sendMessage(jid, { text: "❌ Screenshot failed: " + e.message }) }
  }
}
