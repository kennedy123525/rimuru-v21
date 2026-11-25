const axios = require("axios")
module.exports = {
  name: "tts",
  async execute(sock, msg, args) {
    const jid  = msg.key.remoteJid
    const text = args.join(" ").trim()
    if (!text) return sock.sendMessage(jid, { text: "🎤 Usage: .tts <text>\nExample: .tts Hello world!" })
    await sock.sendMessage(jid, { react: { text: "🎤", key: msg.key } })
    try {
      const clean = text.slice(0, 300).replace(/[*_`#]/g, "")
      let audioBuf = null

      // StreamElements Brian (male voice)
      try {
        const r = await axios.get(
          "https://api.streamelements.com/kappa/v2/speech?voice=Brian&text=" + encodeURIComponent(clean),
          { timeout: 20000, responseType: "arraybuffer",
            headers: { "User-Agent": "Mozilla/5.0", "Accept": "audio/mpeg, audio/*, */*" } }
        )
        if (r.data?.byteLength > 500) audioBuf = Buffer.from(r.data)
      } catch {}

      // Fallback: Google TTS
      if (!audioBuf) {
        try {
          const r = await axios.get(
            "https://translate.google.com/translate_tts?ie=UTF-8&q=" + encodeURIComponent(clean) +
            "&tl=en&total=1&idx=0&textlen=" + clean.length + "&client=gtx&ttsspeed=0.9",
            { timeout: 12000, responseType: "arraybuffer",
              headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" } }
          )
          if (r.data?.byteLength > 500) audioBuf = Buffer.from(r.data)
        } catch {}
      }

      // Fallback: paxsenix
      if (!audioBuf) {
        try {
          const r = await axios.get(
            "https://api.paxsenix.biz.id/tools/tts?text=" + encodeURIComponent(clean) + "&lang=en-US",
            { timeout: 15000, responseType: "arraybuffer" }
          )
          if (r.data?.byteLength > 500) audioBuf = Buffer.from(r.data)
        } catch {}
      }

      if (!audioBuf || audioBuf.length < 500) throw new Error("All TTS APIs failed")

      // Send as MP3 audio file (not voice note) - "mp3 style"
      await sock.sendMessage(jid, {
        audio: audioBuf,
        mimetype: "audio/mpeg",
        ptt: false,
        fileName: "tts_vector_md.mp3"
      }, { quoted: msg })

      await sock.sendMessage(jid, { react: { text: "✅", key: msg.key } })
    } catch(e) {
      await sock.sendMessage(jid, { react: { text: "❌", key: msg.key } })
      sock.sendMessage(jid, { text: "❌ TTS failed: " + e.message })
    }
  }
}
