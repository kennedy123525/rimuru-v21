const os = require("os")
module.exports = {
  name: "sysinfo",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid
    const up = os.uptime()
    const d=Math.floor(up/86400),h=Math.floor((up%86400)/3600),m=Math.floor((up%3600)/60),s=Math.floor(up%60)
    const usedMem = ((os.totalmem()-os.freemem())/1024/1024/1024).toFixed(2)
    const totalMem = (os.totalmem()/1024/1024/1024).toFixed(2)
    const memPct = ((os.totalmem()-os.freemem())/os.totalmem()*100).toFixed(1)
    const memBar = "█".repeat(Math.floor(memPct/10))+"░".repeat(10-Math.floor(memPct/10))
    const cpu = os.cpus()[0]
    const botUp = Math.floor((Date.now()-(global.startTime||Date.now()))/1000)
    const bd=Math.floor(botUp/86400),bh=Math.floor((botUp%86400)/3600),bm=Math.floor((botUp%3600)/60)
    await sock.sendMessage(jid, {
      text:
        "╔═══════════════════════════════╗\n" +
        "║   🖥️  *SYSTEM INFORMATION*    ║\n" +
        "╠═══════════════════════════════╣\n" +
        "║ 💻 Platform: *" + process.platform + " " + process.arch + "*\n" +
        "║ ⚡ Node.js: *" + process.version + "*\n" +
        "║ 🧠 CPU: *" + (cpu?.model||"Unknown").slice(0,25) + "*\n" +
        "║ 🔢 Cores: *" + os.cpus().length + "*\n" +
        "╠═══════════════════════════════╣\n" +
        "║ 💾 RAM Usage:\n" +
        "║   " + memBar + " " + memPct + "%\n" +
        "║   *" + usedMem + "*/*" + totalMem + "* GB\n" +
        "╠═══════════════════════════════╣\n" +
        "║ ⏱️ OS Uptime: *" + [d&&d+"d",h&&h+"h",m&&m+"m",s+"s"].filter(Boolean).join(" ") + "*\n" +
        "║ 🤖 Bot Uptime: *" + [bd&&bd+"d",bh&&bh+"h",bm&&bm+"m"].filter(Boolean).join(" ")||"<1m" + "*\n" +
        "║ 📦 Commands: *" + (global.loadedCmds||434) + "*\n" +
        "╚═══════════════════════════════╝\n" +
        "_Powered by VECTOR MD_"
    })
  }
}
