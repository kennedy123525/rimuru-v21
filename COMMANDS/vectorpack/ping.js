module.exports = {
  name: "ping",
  async execute(sock, msg) {
    const start = Date.now()
    const ms = Date.now() - start
    const bar = ms<100?"🟢 Excellent":ms<300?"🟡 Good":ms<600?"🟠 Average":"🔴 Slow"
    await sock.sendMessage(msg.key.remoteJid, { text: "🏓 *Skibidi don!*\n\n📡 Latency: *" + ms + "ms*\n📶 Speed: " + bar })
  }
}
