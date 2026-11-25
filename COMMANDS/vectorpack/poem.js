const axios = require("axios")
module.exports = {
  name: "poem",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    const topic = args.join(" ") || "love and life"
    try {
      const prompt = "Write a beautiful, long poem about: " + topic + ". Use vivid imagery, metaphors, rhyme scheme. Include at least 6 stanzas with 4 lines each. Make it emotional and moving."
      const r = await axios.get("https://text.pollinations.ai/" + encodeURIComponent(prompt), {timeout:30000, headers:{"User-Agent":"Mozilla/5.0"}})
      if (!r.data) throw new Error("No response")
      await sock.sendMessage(jid, { text: "📝 *Poem: " + topic + "*\n\n" + r.data.trim().slice(0,3000) + "\n\n_Powered by VECTOR MD_" })
    } catch(e) { sock.sendMessage(jid, { text: "❌ Poem gen failed: " + e.message }) }
  }
}
