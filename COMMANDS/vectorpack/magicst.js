const axios = require("axios")
module.exports = {
  name: "magicst",
  async execute(sock, msg, args) {
    const jid   = msg.key.remoteJid
    const query = args.join(" ").trim()
    if (!query) return sock.sendMessage(jid, { text: "🎨 Usage: .magicst <prompt>\nExample: .magicst realistic island from sky view" })
    await sock.sendMessage(jid, { text: "🎨 *Magic Studio generating...* ⏳\n\n_"+query+"_" })
    try {
      const r = await axios.get(
        "https://omegatech-api.dixonomega.tech/api/ai/magicstudio?prompt=" + encodeURIComponent(query),
        { timeout: 60000, responseType: "arraybuffer", headers: { "User-Agent": "Mozilla/5.0" } }
      )
      if (!r.data || r.data.byteLength < 100) throw new Error("No image received")
      await sock.sendMessage(jid, {
        image: Buffer.from(r.data),
        caption: "🎨 *Magic Studio*\n\n📝 Prompt: _" + query + "_\n\n_Powered by VECTOR MD_"
      }, { quoted: msg })
    } catch(e) {
      // Try getting URL response instead
      try {
        const r2 = await axios.get("https://omegatech-api.dixonomega.tech/api/ai/magicstudio?prompt=" + encodeURIComponent(query), { timeout: 60000, headers: {"User-Agent":"Mozilla/5.0"} })
        const imgUrl = r2.data?.image || r2.data?.url
        if (imgUrl) {
          const img = await axios.get(imgUrl, { responseType:"arraybuffer", timeout:30000 })
          await sock.sendMessage(jid, { image: Buffer.from(img.data), caption: "🎨 *Magic Studio*\n\n📝 " + query + "\n\n_Powered by VECTOR MD_" }, { quoted: msg })
          return
        }
      } catch {}
      sock.sendMessage(jid, { text: "❌ Magic Studio failed: " + e.message })
    }
  }
}
