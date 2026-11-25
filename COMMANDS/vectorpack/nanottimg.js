const axios = require("axios")
module.exports = {
  name: "nanottimg",
  async execute(sock, msg, args) {
    const jid   = msg.key.remoteJid
    const query = args.join(" ").trim()
    if (!query) return sock.sendMessage(jid, { text: "🍌 Usage: .nanottimg <prompt>\nExample: .nanottimg A futuristic city at night" })
    await sock.sendMessage(jid, { text: "🍌 *Nano Banana generating image...* ⏳\n\n_" + query + "_" })
    try {
      const r = await axios.get(
        "https://omegatech-api.dixonomega.tech/api/ai/nano-banana-pro?prompt=" + encodeURIComponent(query),
        { timeout: 60000, headers: { "User-Agent": "Mozilla/5.0" } }
      )
      const imgUrl = r.data?.image || r.data?.url
      if (!imgUrl) throw new Error("No image URL in response")
      const img = await axios.get(imgUrl, { responseType: "arraybuffer", timeout: 30000 })
      await sock.sendMessage(jid, {
        image: Buffer.from(img.data),
        caption: "🍌 *Nano Banana Pro*\n\n📝 Prompt: _" + query + "_\n\n_Powered by VECTOR MD_"
      }, { quoted: msg })
    } catch(e) { sock.sendMessage(jid, { text: "❌ Nano Banana failed: " + e.message }) }
  }
}
