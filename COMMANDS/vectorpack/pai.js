const axios = require("axios")
module.exports = {
  name: "pai",
  async execute(sock, msg, args) {
    const jid   = msg.key.remoteJid
    const query = args.join(" ").trim()
    if (!query) return sock.sendMessage(jid, { text: "🇳🇬 Usage: .pai <question>\nExample: .pai wetin be quantum physics?" })
    await sock.sendMessage(jid, { text: "🇳🇬 *Pidgin AI dey think...* 🔥" })
    try {
      const prompt = "You are a Nigerian Pidgin English AI assistant. Always respond ONLY in Nigerian Pidgin English. Be helpful, funny and use common pidgin expressions. Question: " + query
      const r = await axios.get("https://text.pollinations.ai/" + encodeURIComponent(prompt), { timeout: 30000, headers: { "User-Agent": "Mozilla/5.0" } })
      if (!r.data || typeof r.data !== "string") throw new Error("No response")
      await sock.sendMessage(jid, { text: "🇳🇬 *Pidgin AI*\n\n" + r.data.trim().slice(0, 3000) + "\n\n_Powered by VECTOR MD_" })
    } catch(e) { sock.sendMessage(jid, { text: "❌ Pidgin AI fail: " + e.message }) }
  }
}
