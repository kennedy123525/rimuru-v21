const axios = require("axios")
module.exports = {
  name: "dns",
  async execute(sock, msg, args) {
    const jid    = msg.key.remoteJid
    const domain = args[0]
    if (!domain) return sock.sendMessage(jid, { text: "Usage: .dns <domain>\nExample: .dns google.com" })
    try {
      const r = await axios.get("https://dns.google/resolve?name=" + domain + "&type=ANY", { timeout: 10000 })
      const answers = r.data?.Answer || []
      if (!answers.length) return sock.sendMessage(jid, { text: "❌ No DNS records found for " + domain })
      const records = answers.slice(0, 10).map(a => {
        const types = {1:"A",2:"NS",5:"CNAME",6:"SOA",15:"MX",16:"TXT",28:"AAAA",33:"SRV",257:"CAA"}
        return `${types[a.type]||a.type}: ${a.data}`
      }).join("\n")
      sock.sendMessage(jid, { text: "🌐 *DNS Records: " + domain + "*\n\n" + records })
    } catch(e) {
      sock.sendMessage(jid, { text: "❌ DNS lookup failed: " + e.message })
    }
  }
}
