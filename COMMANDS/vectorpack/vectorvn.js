const axios = require("axios")
module.exports = {
  name: "vectorvn",
  async execute(sock, msg, args) {
    const jid   = msg.key.remoteJid
    const query = args.join(" ").trim()
    if (!query) return sock.sendMessage(jid, {
      text: "🎤 Usage: .vectorvn <message>\nExample: .vectorvn yo what's good bro"
    })
    await sock.sendMessage(jid, { react: { text: "🎤", key: msg.key } })
    try {
      // Step 1: Get AI text
      const sysP = "You are Vector AI by CHAD FDEV. Reply very short (1-2 sentences max), casual GenZ. No asterisks, no emojis in text."
      let replyText = query
      try {
        const ai = await axios.get(
          "https://text.pollinations.ai/" + encodeURIComponent(sysP + " Q: " + query),
          { timeout: 15000, headers: { "User-Agent": "Mozilla/5.0" } }
        )
        if (ai.data && typeof ai.data === "string") {
          replyText = ai.data.trim().slice(0, 200).replace(/[*_`#[\]]/g, "")
        }
      } catch {}

      // Step 2: TTS - Brian male voice
      let audioBuf = null
      const ttsChain = [
        async () => {
          const r = await axios.get(
            "https://api.streamelements.com/kappa/v2/speech?voice=Brian&text=" + encodeURIComponent(replyText),
            { timeout: 20000, responseType: "arraybuffer",
              headers: { "User-Agent": "Mozilla/5.0", "Accept": "audio/mpeg,audio/*" } }
          )
          if (r.data?.byteLength > 500) return Buffer.from(r.data)
        },
        async () => {
          const r = await axios.get(
            "https://translate.google.com/translate_tts?ie=UTF-8&q=" + encodeURIComponent(replyText) +
            "&tl=en&client=gtx&ttsspeed=0.9",
            { timeout: 12000, responseType: "arraybuffer",
              headers: { "User-Agent": "Mozilla/5.0 AppleWebKit/537.36" } }
          )
          if (r.data?.byteLength > 500) return Buffer.from(r.data)
        },
        async () => {
          const r = await axios.get(
            "https://api.paxsenix.biz.id/tools/tts?text=" + encodeURIComponent(replyText) + "&lang=en-US",
            { timeout: 15000, responseType: "arraybuffer" }
          )
          if (r.data?.byteLength > 500) return Buffer.from(r.data)
        }
      ]

      for (const fn of ttsChain) {
        try { const buf = await fn(); if (buf) { audioBuf = buf; break } } catch {}
      }

      if (!audioBuf || audioBuf.length < 500) throw new Error("TTS failed")

      // Send as MP3 audio file (mp3 style - same as TTS)
      await sock.sendMessage(jid, {
        audio: audioBuf,
        mimetype: "audio/mpeg",
        ptt: false,
        fileName: "vectorvn_reply.mp3"
      }, { quoted: msg })

    } catch(e) {
      // Text fallback
      try {
        const r = await axios.get("https://text.pollinations.ai/" + encodeURIComponent(query), { timeout: 15000 })
        await sock.sendMessage(jid, { text: "🎤 *Vector VN* (text)\n\n" + String(r.data || "").trim().slice(0, 500) }, { quoted: msg })
      } catch {
        sock.sendMessage(jid, { text: "❌ VectorVN: " + e.message })
      }
    }
  }
}
