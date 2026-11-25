module.exports = {
  name: "feedback",
  async execute(sock, msg, args, sender) {
    const jid  = msg.key.remoteJid
    const text = args.join(" ").trim()
    if (!text) return sock.sendMessage(jid, { text: "Usage: .feedback <message>\nExample: .feedback Great bot!" })
    const cfg     = require("../../lib/vconfig")
    const ownerJid = cfg.ownerNumber + "@s.whatsapp.net"
    const fs      = require("fs")
    const path    = require("path")
    const fbFile  = path.join(__dirname, "..", "lib", "feedbacks.json")
    let fbs = []
    try { if (fs.existsSync(fbFile)) fbs = JSON.parse(fs.readFileSync(fbFile, "utf8")) } catch {}
    fbs.push({ from: sender, text, time: new Date().toISOString() })
    try { fs.writeFileSync(fbFile, JSON.stringify(fbs, null, 2)) } catch {}
    // Notify owner
    if (global.sock && sender !== ownerJid) {
      try { await global.sock.sendMessage(ownerJid, { text: "📬 *New Feedback!*\n\nFrom: +" + sender.split("@")[0] + "\n💬 " + text }) } catch {}
    }
    sock.sendMessage(jid, { text: "✅ Feedback sent! Thank you 🙏" })
  }
}
