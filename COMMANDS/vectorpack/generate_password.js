const crypto = require("crypto")
module.exports = {
  name: "genpass2",
  async execute(sock, msg, args) {
    const jid    = msg.key.remoteJid
    const len    = Math.min(Math.max(parseInt(args[0]) || 16, 8), 64)
    const type   = args[1]?.toLowerCase() || "strong"
    let charset  = ""
    if (type === "simple")  charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    else if (type === "pin") charset = "0123456789"
    else charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"
    const bytes = crypto.randomBytes(len)
    const pass  = Array.from(bytes).map(b => charset[b % charset.length]).join("")
    sock.sendMessage(jid, {
      text: "🔐 *Generated Password*\n\n" +
            "```" + pass + "```\n\n" +
            "📏 Length: " + len + " chars\n" +
            "💪 Type: " + type + "\n\n" +
            "💡 Usage: .genpass2 <length> <type>\n" +
            "Types: strong (default), simple, pin"
    })
  }
}
