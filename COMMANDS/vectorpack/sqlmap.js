const { isPaired } = require("../../lib/auth")
module.exports = {
  name: "sqlinject",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    if (!isPaired(sender)) return sock.sendMessage(jid, { text: "❌ Paired users only!" })
    const url = args[0]
    if (!url) return sock.sendMessage(jid, { text: "Usage: .sqlinject <url>\nExample: .sqlinject https://target.com/page?id=1\n\n⚠️ Educational purposes only! Only test sites you own." })
    await sock.sendMessage(jid, { text: "🔍 *SQL Injection Test*\n\n🎯 Target: " + url + "\n\n⚠️ _Educational purposes only - Testing sites you don't own is illegal!_\n\n📚 Common SQL injection payloads:\n```\n' OR '1'='1\n' OR 1=1--\n'; DROP TABLE users;--\n' UNION SELECT 1,2,3--\nadmin' --\n```\n\n💡 To properly test for SQLi:\n1. Use SQLmap tool\n2. Use OWASP ZAP\n3. Test on CTF platforms\n\n_Powered by VECTOR MD_" })
  }
}
