module.exports = {
  name: "age",
  async execute(sock, msg, args) {
    const input = args.join(" ")
    if (!input) return sock.sendMessage(msg.key.remoteJid, { text: "Usage: .age <YYYY-MM-DD>\nExample: .age 2000-05-15" })
    const birth = new Date(input)
    if (isNaN(birth)) return sock.sendMessage(msg.key.remoteJid, { text: "❌ Invalid date. Use format: YYYY-MM-DD" })
    const now = new Date()
    let age = now.getFullYear() - birth.getFullYear()
    const m = now.getMonth() - birth.getMonth()
    if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--
    const days = Math.floor((now - birth) / 86400000)
    sock.sendMessage(msg.key.remoteJid, { text: `🎂 *Age Calculator*\n\nBirthday: ${input}\nAge: *${age} years old*\nDays lived: *${days.toLocaleString()} days*\nHours lived: *${(days*24).toLocaleString()} hours*` })
  }
}
