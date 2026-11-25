const fs   = require("fs")
const path = require("path")
const { isPaired, getNum } = require("../../lib/auth")
module.exports = {
  name: "adduser",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    if (!isPaired(sender)) return sock.sendMessage(jid, { text: "❌ Only paired users can add users!" })
    const raw = (args[0]||"").replace(/\D/g,"").trim()
    if (!raw || raw.length < 7) return sock.sendMessage(jid, {
      text: "📱 *Add User (sudo)*\n\nUsage: .adduser <number>\nExample: .adduser 2349012345678"
    })
    const userJid = raw + "@s.whatsapp.net"
    // Check not already added
    if ((global.pairedUsers||[]).some(u => getNum(u) === raw)) {
      return sock.sendMessage(jid, { text: "⚠️ +" + raw + " is already a paired user!" })
    }
    if (!global.pairedUsers) global.pairedUsers = []
    global.pairedUsers.push(userJid)
    // Save
    const file = path.join(__dirname, "../lib/paired.json")
    try {
      fs.writeFileSync(file, JSON.stringify(global.pairedUsers, null, 2))
      console.log("✅ Saved paired.json, total:", global.pairedUsers.length)
    } catch(e) { console.log("❌ Save error:", e.message) }
    // Welcome
    try { await sock.sendMessage(userJid, { text: "🎉 *You've been added to VECTOR MD!*\n\nSend *.menu* to see commands! 🤖\n\n_Powered by VECTOR MD_" }) } catch {}
    sock.sendMessage(jid, {
      text: "✅ *+" + raw + " added!* 🔥\n\n👥 Total paired: " + global.pairedUsers.length + "\nThey now have full access!"
    })
  }
}
