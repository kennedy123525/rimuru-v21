const os = require("os")
module.exports = {
  name: "botinfo",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid
    const cfg = require("../../lib/vconfig")
    const up  = Math.floor((Date.now()-(global.startTime||Date.now()))/1000)
    const d=Math.floor(up/86400),h=Math.floor((up%86400)/3600),m=Math.floor((up%3600)/60),s=up%60
    const mem = (process.memoryUsage().heapUsed/1024/1024).toFixed(1)
    const totalMem = (os.totalmem()/1024/1024/1024).toFixed(1)
    const freeMem = (os.freemem()/1024/1024/1024).toFixed(1)
    const users = (global.pairedUsers||[]).length
    const time = new Intl.DateTimeFormat("en-GB",{timeZone:"Europe/Madrid",dateStyle:"medium",timeStyle:"short"}).format(new Date())
    await sock.sendMessage(jid, {
      text:
        "╔═══════════════════════════════╗\n" +
        "║    🤖 *VECTOR MD BOT INFO*    ║\n" +
        "╠═══════════════════════════════╣\n" +
        "║ 🤖 Name: *VECTOR MD v2.0*\n" +
        "║ 👑 Owner: *" + cfg.ownerName + "*\n" +
        "║ 🛠️ Dev: *CHAD FDEV*\n" +
        "║ 🔧 Prefix: *" + (global.currentPrefix||cfg.prefix||".") + "*\n" +
        "║ 📦 Commands: *" + (global.loadedCmds||434) + "*\n" +
        "║ 👥 Paired Users: *" + users + "*\n" +
        "╠═══════════════════════════════╣\n" +
        "║ ⏱️ Uptime: *" + [d&&d+"d",h&&h+"h",m&&m+"m",s+"s"].filter(Boolean).join(" ") + "*\n" +
        "║ 💾 Heap: *" + mem + "MB*\n" +
        "║ 🖥️ RAM: *" + freeMem + "/" + totalMem + "GB*\n" +
        "║ 📅 Started: *" + time + "*\n" +
        "╠═══════════════════════════════╣\n" +
        "║ ⚡ Node: *" + process.version + "*\n" +
        "║ 💻 OS: *" + process.platform + " " + process.arch + "*\n" +
        "╚═══════════════════════════════╝\n\n" +
        "📢 https://whatsapp.com/channel/0029VbC0opaKGGGFWv4eul2j\n" +
        "_Powered by VECTOR MD_"
    })
  }
}
