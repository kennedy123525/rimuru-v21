const axios = require("axios")
module.exports = {
  name: "dns",
  async execute(sock, msg, args) {
    const jid    = msg.key.remoteJid
    const domain = args[0]
    if (!domain) return sock.sendMessage(jid, { text: "Usage: .dns <domain>\nExample: .dns google.com" })
    try {
      const r = await axios.get("https://dns.google/resolve?name=" + encodeURIComponent(domain) + "&type=A", {timeout:10000})
      const records = r.data?.Answer || []
      if (!records.length) return sock.sendMessage(jid, { text: "❌ No DNS records found for: " + domain })
      const aRecords  = records.filter(r=>r.type===1).map(r=>r.data)
      const cnameRecs = records.filter(r=>r.type===5).map(r=>r.data)
      // Also get MX and TXT
      const mx = await axios.get("https://dns.google/resolve?name=" + encodeURIComponent(domain) + "&type=MX", {timeout:5000}).then(r=>r.data?.Answer||[]).catch(()=>[])
      await sock.sendMessage(jid, {
        text: "🌐 *DNS Lookup: " + domain + "*\n\n" +
              (aRecords.length ? "📍 A Records:\n" + aRecords.map(a=>"  • "+a).join("\n") + "\n\n" : "") +
              (cnameRecs.length ? "🔗 CNAME:\n" + cnameRecs.map(c=>"  • "+c).join("\n") + "\n\n" : "") +
              (mx.length ? "📧 MX Records:\n" + mx.slice(0,5).map(m=>"  • "+m.data).join("\n") : "") +
              "\n\n_Powered by VECTOR MD_"
      })
    } catch(e) { sock.sendMessage(jid, { text: "❌ DNS lookup failed: " + e.message }) }
  }
}
