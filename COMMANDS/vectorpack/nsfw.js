const axios = require("axios")
const { isPaired } = require("../../lib/auth")
module.exports = {
  name: "nsfw",
  async execute(sock, msg, args, sender) {
    const jid   = msg.key.remoteJid
    if (!isPaired(sender)) return sock.sendMessage(jid, { text: "❌ Paired users only!" })
    const query = args.join(" ").trim()
    if (!query) return sock.sendMessage(jid, { text: "🔞 Usage: .nsfw <prompt>\nExample: .nsfw sunset beach\n\n⚠️ 18+ only" })
    await sock.sendMessage(jid, { react: { text: "🔞", key: msg.key } })
    await sock.sendMessage(jid, { text: "🔞 Generating..." })
    const apis = [
      async () => {
        const r = await axios.get("https://omegatech-api.dixonomega.tech/api/ai/text2nsfw?q=" + encodeURIComponent(query), { timeout:40000 })
        const images = r.data?.images; if(images?.length) return images[0]
        throw new Error("no images")
      },
      async () => {
        // Waifu.im for fallback SFW/NSFW
        const categories = ["hentai","maid","waifu","shinobu","megumin","rias-greatdemon"]
        const cat = categories[Math.floor(Math.random()*categories.length)]
        const r = await axios.get("https://api.waifu.im/search?included_tags=" + cat + "&nsfw=true", {timeout:15000})
        const img = r.data?.images?.[0]?.url; if(img) return img
        throw new Error("no image")
      }
    ]
    for (const api of apis) {
      try {
        const imgUrl = await api()
        const imgRes = await axios.get(imgUrl, { responseType:"arraybuffer", timeout:30000, headers:{"User-Agent":"Mozilla/5.0"} })
        await sock.sendMessage(jid, {
          image: Buffer.from(imgRes.data),
          caption: "🔞 *NSFW*\n📝 " + query + "\n\n_Powered by VECTOR MD_"
        }, { quoted: msg })
        await sock.sendMessage(jid, { react: { text: "✅", key: msg.key } })
        return
      } catch {}
    }
    await sock.sendMessage(jid, { react: { text: "❌", key: msg.key } })
    await sock.sendMessage(jid, { text: "❌ NSFW generation failed. Try again." })
  }
}
