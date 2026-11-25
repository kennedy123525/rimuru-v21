const os = require("os")
module.exports = {
  name: "alive",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid
    const cfg = require("../../lib/vconfig")
    const up  = Math.floor((Date.now() - (global.startTime || Date.now())) / 1000)
    const d   = Math.floor(up/86400), h = Math.floor((up%86400)/3600), m = Math.floor((up%3600)/60), s = up%60
    const runtime = [d&&d+"d",h&&h+"h",m&&m+"m",s+"s"].filter(Boolean).join(" ")
    const mem  = (process.memoryUsage().heapUsed/1024/1024).toFixed(1)
    const free = (os.freemem()/1024/1024/1024).toFixed(1)
    const now  = new Intl.DateTimeFormat("en-GB",{timeZone:"Europe/Madrid",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:false}).format(new Date())

    await sock.sendMessage(jid, {
      text:
        "╔══════════════════════╗\n" +
        "║  🔥 *VECTOR MD v3.0!*  ║\n" +
        "╚══════════════════════╝\n\n" +
        "🤖 Bot: *" + cfg.botName + "*\n" +
        "👑 Owner: *" + cfg.ownerName + "*\n" +
        "⚡ Prefix: *" + (global.currentPrefix||cfg.prefix||".") + "*\n" +
        "📦 Commands: *" + (global.loadedCmds||348) + "*\n" +
        "⏱️ Uptime: *" + runtime + "*\n" +
        "💾 Mem: *" + mem + "MB*\n" +
        "🕐 Time: *" + now + "* (Madrid)\n" +
        "📶 Status: *🟢 Online*\n\n" +
        "🎯 _1000+ commands loaded — never stops!_ 🔥"
    })
  }
}
