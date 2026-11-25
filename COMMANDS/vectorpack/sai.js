const axios = require("axios")
module.exports = {
  name: "sai",
  async execute(sock, msg, args) {
    const jid   = msg.key.remoteJid
    const query = args.join(" ").trim()
    if (!query) return sock.sendMessage(jid, { text: "🇪🇸 Uso: .sai <pregunta>\nEjemplo: .sai ¿Qué es la física cuántica?" })
    await sock.sendMessage(jid, { text: "🇪🇸 *IA española pensando...* 💫" })
    try {
      const prompt = "Eres un asistente de IA en español. Responde SIEMPRE en español de España, de forma amigable y natural. Pregunta: " + query
      const r = await axios.get("https://text.pollinations.ai/" + encodeURIComponent(prompt), { timeout: 30000, headers: { "User-Agent": "Mozilla/5.0" } })
      if (!r.data || typeof r.data !== "string") throw new Error("No response")
      await sock.sendMessage(jid, { text: "🇪🇸 *IA Española*\n\n" + r.data.trim().slice(0, 3000) + "\n\n_Con el poder de VECTOR MD_" })
    } catch(e) { sock.sendMessage(jid, { text: "❌ IA falló: " + e.message }) }
  }
}
