const axios = require("axios")
if (!global.qwenSessions) global.qwenSessions = {}
module.exports = {
  name: "qwen",
  async execute(sock, msg, args) {
    const jid   = msg.key.remoteJid
    const query = args.join(" ").trim()
    if (!query) return sock.sendMessage(jid, {
      text: "🧠 Usage: .qwen <message>\nExample: .qwen build me a login page with HTML\n\n_Qwen AI - Vision, Analysis, Full Stack Dev_\n_Powered by VECTOR MD_"
    })
    await sock.sendMessage(jid, { text: "🧠 *Qwen AI processing...* ⏳" })
    try {
      const userId = global.qwenSessions[jid] || ("VECTMD_" + jid.slice(0,8))
      global.qwenSessions[jid] = userId
      const r = await axios.get("https://omegatech-api.dixonomega.tech/api/ai/Qwen-3-vl", {
        params: { text: query, userId, mode: "auto", model: "auto" },
        timeout: 45000, headers: { "User-Agent": "Mozilla/5.0" }
      })
      if (!r.data?.success) throw new Error(r.data?.message || "API failed")
      const result = r.data.result || "No response"
      // Send in chunks if too long
      if (result.length > 3500) {
        const chunks = result.match(/.{1,3500}/gs) || [result]
        await sock.sendMessage(jid, { text: "🧠 *Qwen AI*\n\n" + chunks[0] + "\n\n_Powered by VECTOR MD_" }, { quoted: msg })
        for (let i = 1; i < chunks.length; i++) {
          await new Promise(r => setTimeout(r, 500))
          await sock.sendMessage(jid, { text: chunks[i] })
        }
      } else {
        await sock.sendMessage(jid, { text: "🧠 *Qwen AI*\n\n" + result + "\n\n_Powered by VECTOR MD_" }, { quoted: msg })
      }
    } catch(e) { sock.sendMessage(jid, { text: "❌ Qwen AI failed: " + e.message }) }
  }
}
