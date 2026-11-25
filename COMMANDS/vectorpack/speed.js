module.exports = {
  name: "speed",
  async execute(sock, msg) {
    const start = Date.now()
    const ms = Date.now() - start
    const rating = ms < 100 ? "🟢 Lightning fast!" : ms < 300 ? "🟡 Pretty fast" : ms < 600 ? "🟠 Average" : "🔴 Slow"
    await sock.sendMessage(msg.key.remoteJid, {
      text: `⚡ *Speed Test*\n\n📡 Response: *${ms}ms*\n${rating}`
    })
  }
}
