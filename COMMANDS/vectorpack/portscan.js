const net = require("net")
module.exports = {
  name: "portscan",
  async execute(sock, msg, args) {
    const jid  = msg.key.remoteJid
    const host = args[0]
    if (!host) return sock.sendMessage(jid, { text: "Usage: .portscan <host>\nExample: .portscan scanme.nmap.org\n\n⚠️ Only use on hosts you own or have permission to scan!" })

    await sock.sendMessage(jid, { text: "🔍 Scanning common ports on *" + host + "*...\n\n⚠️ This may take 30 seconds." })

    const commonPorts = [21,22,23,25,53,80,110,143,443,445,993,995,3306,3389,5432,6379,8080,8443,8888,27017]
    const open = [], closed = []

    const checkPort = (port) => new Promise(resolve => {
      const sock2 = new net.Socket()
      sock2.setTimeout(2000)
      sock2.connect(port, host, () => { open.push(port); sock2.destroy(); resolve() })
      sock2.on("error", () => { closed.push(port); sock2.destroy(); resolve() })
      sock2.on("timeout", () => { sock2.destroy(); resolve() })
    })

    await Promise.all(commonPorts.map(checkPort))
    open.sort((a,b) => a-b)

    const serviceMap = {21:"FTP",22:"SSH",23:"Telnet",25:"SMTP",53:"DNS",80:"HTTP",110:"POP3",143:"IMAP",443:"HTTPS",445:"SMB",993:"IMAPS",995:"POP3S",3306:"MySQL",3389:"RDP",5432:"PostgreSQL",6379:"Redis",8080:"HTTP-Alt",8443:"HTTPS-Alt",8888:"HTTP-Alt",27017:"MongoDB"}
    const openList = open.map(p => `✅ ${p} (${serviceMap[p]||"Unknown"})`).join("\n") || "None found"

    await sock.sendMessage(jid, {
      text: "🔒 *Port Scan Results*\n*Host:* " + host + "\n\n" +
            "🟢 *Open Ports:*\n" + openList + "\n\n" +
            "📊 Scanned: " + commonPorts.length + " ports\n" +
            "✅ Open: " + open.length + " | ❌ Closed: " + closed.length
    })
  }
}
