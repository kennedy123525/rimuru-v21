module.exports = {
  name: "subnet",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    const input = args[0]
    if (!input || !input.includes("/")) return sock.sendMessage(jid, { text: "Usage: .subnet <ip/cidr>\nExample: .subnet 192.168.1.0/24" })
    try {
      const [ip, cidr] = input.split("/")
      const prefix = parseInt(cidr)
      if (isNaN(prefix) || prefix < 0 || prefix > 32) return sock.sendMessage(jid, { text: "❌ Invalid CIDR notation" })
      const mask  = (~0 << (32 - prefix)) >>> 0
      const hosts = prefix >= 31 ? Math.pow(2, 32-prefix) : Math.pow(2, 32-prefix) - 2
      const parts = ip.split(".").map(Number)
      const ipNum = (parts[0]<<24|parts[1]<<16|parts[2]<<8|parts[3]) >>> 0
      const netNum = (ipNum & mask) >>> 0
      const bcast = (netNum | (~mask >>> 0)) >>> 0
      const toIp  = n => [(n>>>24)&255,(n>>>16)&255,(n>>>8)&255,n&255].join(".")
      const netmask = toIp(mask)
      sock.sendMessage(jid, {
        text: "🌐 *Subnet Calculator*\n\n" +
              "📍 IP Address: " + ip + "\n" +
              "📏 CIDR: /" + cidr + "\n" +
              "🎭 Netmask: " + netmask + "\n" +
              "🏠 Network: " + toIp(netNum) + "\n" +
              "📡 Broadcast: " + toIp(bcast) + "\n" +
              "💻 Host Range: " + toIp(netNum+1) + " - " + toIp(bcast-1) + "\n" +
              "🔢 Usable Hosts: " + hosts.toLocaleString()
      })
    } catch(e) {
      sock.sendMessage(jid, { text: "❌ Subnet calc error: " + e.message })
    }
  }
}
