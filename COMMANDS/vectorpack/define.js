const axios = require("axios")
module.exports = {
  name: "define",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    const word = args[0]
    if (!word) return sock.sendMessage(jid, { text: "Usage: .define <word>\nExample: .define serendipity" })
    try {
      const r = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`, { timeout: 12000 })
      const entry = r.data[0]
      const meaning = entry.meanings[0]
      const def = meaning.definitions[0]
      const phonetic = entry.phonetic || entry.phonetics?.[0]?.text || ""
      let txt = `📖 *${entry.word}* ${phonetic}\n\n🏷️ *${meaning.partOfSpeech}*\n\n📝 ${def.definition}`
      if (def.example) txt += `\n\n💬 _"${def.example}"_`
      if (meaning.synonyms?.length) txt += `\n\n🔗 Synonyms: ${meaning.synonyms.slice(0,4).join(", ")}`
      sock.sendMessage(jid, { text: txt })
    } catch {
      sock.sendMessage(jid, { text: `❌ No definition found for "${args[0]}".` })
    }
  }
}
