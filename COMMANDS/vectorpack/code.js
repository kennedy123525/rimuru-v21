const axios = require("axios")
module.exports = {
  name: "code",
  async execute(sock, msg, args) {
    const jid   = msg.key.remoteJid
    const query = args.join(" ").trim()
    if (!query) return sock.sendMessage(jid, {
      text: "💻 *Code Generator*\n\nUsage: .code <what you want coded>\n\nExamples:\n• .code a snake game in python\n• .code a login page with HTML CSS\n• .code a calculator in JavaScript\n• .code a REST API in Node.js"
    })
    await sock.sendMessage(jid, { react: { text: "⏳", key: msg.key } })
    await sock.sendMessage(jid, { text: "💻 *Coding:* _" + query + "_\n\n⏳ Please wait..." })
    try {
      const prompt = "You are an expert programmer. Write complete, working, well-commented code for: " + query + ". Provide ONLY the code with brief comments. No explanations outside the code. Make it production-ready."
      const r = await axios.get(
        "https://text.pollinations.ai/" + encodeURIComponent(prompt),
        { timeout: 60000, headers: { "User-Agent": "Mozilla/5.0" } }
      )
      if (!r.data || typeof r.data !== "string") throw new Error("No response")
      const code = r.data.trim().slice(0, 4000)
      // Send in chunks if too long
      if (code.length > 3500) {
        const chunks = code.match(/.{1,3500}/gs) || [code]
        await sock.sendMessage(jid, { text: "💻 *Code for:* _" + query + "_\n\n```\n" + chunks[0] + "\n```" })
        for (let i = 1; i < chunks.length; i++) {
          await new Promise(r => setTimeout(r, 500))
          await sock.sendMessage(jid, { text: "```\n" + chunks[i] + "\n```" })
        }
      } else {
        await sock.sendMessage(jid, { text: "💻 *Code for:* _" + query + "_\n\n```\n" + code + "\n```" })
      }
      await sock.sendMessage(jid, { react: { text: "✅", key: msg.key } })
    } catch(e) {
      await sock.sendMessage(jid, { react: { text: "❌", key: msg.key } })
      await sock.sendMessage(jid, { text: "❌ Code generation failed: " + e.message })
    }
  }
}
