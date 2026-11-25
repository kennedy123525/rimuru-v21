module.exports = {
  name: "passcheck",
  async execute(sock, msg, args) {
    const jid  = msg.key.remoteJid
    const pass = args.join(" ")
    if (!pass) return sock.sendMessage(jid, { text: "Usage: .passcheck <password>\nExample: .passcheck MyPass123!" })
    let score = 0, tips = []
    if (pass.length >= 8) score++; else tips.push("❌ Use at least 8 characters")
    if (pass.length >= 12) score++; else tips.push("💡 12+ characters is better")
    if (/[A-Z]/.test(pass)) score++; else tips.push("❌ Add uppercase letters (A-Z)")
    if (/[a-z]/.test(pass)) score++; else tips.push("❌ Add lowercase letters (a-z)")
    if (/[0-9]/.test(pass)) score++; else tips.push("❌ Add numbers (0-9)")
    if (/[^A-Za-z0-9]/.test(pass)) score++; else tips.push("❌ Add special chars (!@#$%)")
    const common = ["password","123456","qwerty","abc123","password1","admin","letmein","welcome"]
    if (common.some(c => pass.toLowerCase().includes(c))) { score = Math.max(0, score-2); tips.push("⚠️ Avoid common words!") }
    const strength = score <= 2 ? "🔴 Very Weak" : score <= 3 ? "🟠 Weak" : score <= 4 ? "🟡 Fair" : score <= 5 ? "🟢 Strong" : "💪 Very Strong"
    sock.sendMessage(jid, {
      text: "🔐 *Password Strength Check*\n\n🔑 Password: `" + pass + "`\n📊 Score: " + score + "/6\n💪 Strength: " + strength +
            (tips.length ? "\n\n📝 *Tips:*\n" + tips.join("\n") : "\n\n✅ Password looks good!")
    })
  }
}
