module.exports = {
  name: "calc",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    const expr = args.join(" ")
    if (!expr) return sock.sendMessage(jid, { text: "Usage: .calc <expression>\nExample: .calc 5 * 5 + 10" })
    try {
      // Safe eval - only allow numbers and operators
      const safe = expr.replace(/[^0-9+\-*/.() %^]/g, "")
      if (!safe) return sock.sendMessage(jid, { text: "❌ Invalid expression." })
      const result = Function('"use strict"; return (' + safe + ')')()
      if (!isFinite(result)) return sock.sendMessage(jid, { text: "❌ Result is undefined (division by zero?)" })
      sock.sendMessage(jid, { text: `🧮 *Calculator*\n\n📝 ${expr}\n➕ = *${result}*` })
    } catch {
      sock.sendMessage(jid, { text: "❌ Invalid expression.\nExample: .calc 5 * (3 + 2)" })
    }
  }
}
