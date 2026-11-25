const { isPaired } = require("../../lib/auth")
module.exports = {
  name: "subnet",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    if (!isPaired(sender)) return sock.sendMessage(jid, { text: "❌ Paired users only!" })
    const input = args[0]
    if (!input || !input.includes("/")) return sock.sendMessage(jid, { text: "Usage: .subnet <ip/cidr>\nExample: .subnet 192.168.1.0/24" })
    try {
      const [ipStr, cidrStr] = input.split("/")
      const cidr = parseInt(cidrStr)
      if (isNaN(cidr) || cidr < 0 || cidr > 32) throw new Error("Invalid CIDR")
      const ipParts = ipStr.split(".").map(Number)
      if (ipParts.length !== 4 || ipParts.some(isNaN)) throw new Error("Invalid IP")
      const mask = (~0 << (32 - cidr)) >>> 0
      const ipInt = ((ipParts[0]<<24)|(ipParts[1]<<16)|(ipParts[2]<<8)|ipParts[3]) >>> 0
      const netInt = (ipInt & mask) >>> 0
      const bcInt  = (netInt | ~mask) >>> 0
      const toIP = n => [(n>>>24)&255,(n>>>16)&255,(n>>>8)&255,n&255].join(".")
      const hosts = Math.pow(2, 32-cidr) - 2
      await sock.sendMessage(jid, {
        text: "╔════════════════════════╗\n║  🌐 *SUBNET CALCULATOR*  ║\n╚════════════════════════╝\n\n" +
              "📥 Input: *" + input + "*\n\n" +
              "🌐 Network: *" + toIP(netInt) + "*\n" +
              "📡 Broadcast: *" + toIP(bcInt) + "*\n" +
              "🎭 Subnet Mask: *" + toIP(mask) + "*\n" +
              "🏠 First Host: *" + toIP(netInt+1) + "*\n" +
              "🏠 Last Host: *" + toIP(bcInt-1) + "*\n" +
              "👥 Usable Hosts: *" + hosts.toLocaleString() + "*\n" +
              "📊 CIDR: */" + cidr + "*\n\n" +
              "_Powered by VECTOR MD_"
      })
    } catch(e) { sock.sendMessage(jid, { text: "❌ " + e.message }) }
  }
}
