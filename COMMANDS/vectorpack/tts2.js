const axios = require("axios")
module.exports = {
  name: "tts2",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    const input = args.join(" ")
    if (!input) return sock.sendMessage(jid, { text: "Usage: .tts2 <text>\nExample: .tts2 Hello World" })
    try {
      const url = "https://translate.google.com/translate_tts?ie=UTF-8&q=" + encodeURIComponent(input) + "&tl=en&client=tw-ob&ttsspeed=1"
      await sock.sendMessage(jid, { audio: { url }, mimetype: "audio/mpeg", ptt: true })
    } catch { sock.sendMessage(jid, { text: "❌ TTS failed." }) }
  }
}
