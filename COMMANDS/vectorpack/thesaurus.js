const axios = require("axios")
module.exports = {
  name: "thesaurus",
  async execute(sock, msg, args) {
    const word = args[0]
    if (!word) return sock.sendMessage(msg.key.remoteJid, { text: "Usage: .thesaurus <word>" })
    try {
      const r = await axios.get("https://api.dictionaryapi.dev/api/v2/entries/en/" + encodeURIComponent(word), { timeout: 12000 })
      const entry = r.data[0]
      let syns = [], ants = []
      entry.meanings.forEach(m => {
        syns.push(...(m.synonyms||[]))
        ants.push(...(m.antonyms||[]))
      })
      let text = "📚 *Thesaurus: " + word + "*\n\n"
      if (syns.length) text += "✅ Synonyms: " + [...new Set(syns)].slice(0,8).join(", ") + "\n"
      if (ants.length) text += "❌ Antonyms: " + [...new Set(ants)].slice(0,8).join(", ")
      if (!syns.length && !ants.length) text += "No synonyms/antonyms found."
      sock.sendMessage(msg.key.remoteJid, { text })
    } catch { sock.sendMessage(msg.key.remoteJid, { text: "❌ Not found for: " + word }) }
  }
}
