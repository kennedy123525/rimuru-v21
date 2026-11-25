const axios = require("axios")
module.exports = {
  name: "urlcheck",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    const url = args[0]
    if (!url) return sock.sendMessage(jid, { text: "Usage: .urlcheck <url>\nExample: .urlcheck https://google.com" })
    try {
      const r = await axios.get(
        "https://api.promptapi.com/virustotal/url?url=" + encodeURIComponent(url),
        { timeout: 15000 }
      ).catch(() => null)
      // Fallback: just show basic URL info
      const parsed = new URL(url.startsWith("http") ? url : "https://" + url)
      const checks = [
        parsed.protocol === "https:" ? "✅ Uses HTTPS (secure)" : "⚠️ Not using HTTPS",
        parsed.hostname.length > 50 ? "⚠️ Very long domain (suspicious)" : "✅ Normal domain length",
        /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(parsed.hostname) ? "⚠️ IP address URL (suspicious)" : "✅ Has proper domain",
        url.includes("@") ? "⚠️ Contains @ symbol (phishing indicator)" : "✅ No @ symbol",
        /bit\.ly|tinyurl|t\.co|ow\.ly|short/i.test(url) ? "⚠️ Shortened URL - be careful" : "✅ Not a shortened URL"
      ]
      const safe = checks.filter(c => c.startsWith("✅")).length
      const warn = checks.filter(c => c.startsWith("⚠️")).length
      const result = warn === 0 ? "🟢 Likely Safe" : warn <= 1 ? "🟡 Proceed with Caution" : "🔴 Suspicious - Avoid!"
      sock.sendMessage(jid, {
        text: "🔍 *URL Safety Check*\n\n🌐 URL: " + url + "\n\n📊 *Analysis:*\n" + checks.join("\n") +
              "\n\n" + result + "\n✅ " + safe + " safe checks | ⚠️ " + warn + " warnings"
      })
    } catch(e) {
      sock.sendMessage(jid, { text: "❌ Could not check URL: " + e.message })
    }
  }
}
