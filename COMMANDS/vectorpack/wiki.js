const axios = require("axios")
module.exports = {
  name: "wiki",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    const query = args.join(" ")
    if (!query) return sock.sendMessage(jid, { text: "Usage: .wiki <topic>\nExample: .wiki Nigeria" })
    try {
      const r = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`, { timeout: 12000 })
      if (r.data.type === "disambiguation") return sock.sendMessage(jid, { text: `❓ "${query}" is ambiguous. Try being more specific.\nExample: .wiki Lagos Nigeria` })
      const text = r.data.extract?.substring(0, 700)
      sock.sendMessage(jid, { text: `📚 *${r.data.title}*\n\n${text}...\n\n🔗 ${r.data.content_urls?.desktop?.page || ""}` })
    } catch {
      sock.sendMessage(jid, { text: `❌ No Wikipedia article found for "${query}".` })
    }
  }
}
