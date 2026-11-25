const os = require("os")
module.exports = {
  name: "runtime",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid
    const up  = Math.floor((Date.now() - (global.startTime || Date.now())) / 1000)
    const d=Math.floor(up/86400),h=Math.floor((up%86400)/3600),m=Math.floor((up%3600)/60),s=up%60
    const parts=[d&&d+"d",h&&h+"h",m&&m+"m",s+"s"].filter(Boolean)
    const upPct = Math.min(100, (up / 86400 * 100)).toFixed(1)
    const bar = "█".repeat(Math.floor(upPct/10)) + "░".repeat(10-Math.floor(upPct/10))
    const time = new Intl.DateTimeFormat("en-GB",{timeZone:"Europe/Madrid",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:false}).format(new Date())
    await sock.sendMessage(jid, {
      text:
        "╔══════════════════════════╗\n" +
        "║   ⏱️  *VECTOR MD RUNTIME*  ║\n" +
        "╠══════════════════════════╣\n" +
        "║ 🚀 Up: *" + parts.join(" ") + "*\n" +
        "║ ⏰ Time: *" + time + "* (Madrid)\n" +
        "║ 📊 " + bar + " " + upPct + "%\n" +
        "║ 💾 RAM: *" + (process.memoryUsage().heapUsed/1024/1024).toFixed(1) + "MB*\n" +
        "║ ⚡ Node: *" + process.version + "*\n" +
        "╚══════════════════════════╝\n\n" +
        "🔥 _Skibidi bot never sleeps!_ 💤❌\n" +
        "_Powered by VECTOR MD_"
    })
  }
}
