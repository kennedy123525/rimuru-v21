const axios = require("axios")
module.exports = {
  name: "dictionary",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    const word = args[0]
    if (!word) return sock.sendMessage(jid, { text: "Usage: .dictionary <word>" })
    try {
      const r = await axios.get("https://api.dictionaryapi.dev/api/v2/entries/en/" + encodeURIComponent(word), { timeout: 12000 })
      const entry = r.data[0]
      let text = "📖 *" + entry.word + "*"
      if (entry.phonetic) text += "  " + entry.phonetic
      text += "\n"
      entry.meanings.slice(0,3).forEach(m => {
        text += "\n🏷️ *" + m.partOfSpeech + "*\n"
        m.definitions.slice(0,2).forEach((d,i) => {
          text += (i+1) + ". " + d.definition + "\n"
          if (d.example) text += "_\"" + d.example + "\"_\n"
        })
        if (m.synonyms?.length) text += "↔️ Synonyms: " + m.synonyms.slice(0,3).join(", ") + "\n"
      })
      sock.sendMessage(jid, { text })
    } catch { sock.sendMessage(jid, { text: "❌ No definition for \"" + word + "\"" }) }
  }
}
