const axios = require("axios")
module.exports = {
  name: "currency",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    if (args.length < 3) return sock.sendMessage(jid, { text: "Usage: .currency <amount> <FROM> <TO>\nExample: .currency 100 USD NGN\n\nCommon codes: USD, NGN, GBP, EUR, GHS, KES, ZAR" })
    const [amount, from, to] = args
    if (isNaN(amount)) return sock.sendMessage(jid, { text: "❌ Amount must be a number." })
    try {
      const r = await axios.get(`https://api.exchangerate-api.com/v4/latest/${from.toUpperCase()}`, { timeout: 12000 })
      const rate = r.data.rates[to.toUpperCase()]
      if (!rate) return sock.sendMessage(jid, { text: `❌ Unknown currency: ${to.toUpperCase()}` })
      const result = (parseFloat(amount) * rate).toLocaleString("en-US", { maximumFractionDigits: 2 })
      sock.sendMessage(jid, { text: `💱 *Currency Converter*\n\n${amount} ${from.toUpperCase()} = *${result} ${to.toUpperCase()}*\n\n📈 Rate: 1 ${from.toUpperCase()} = ${rate.toFixed(4)} ${to.toUpperCase()}` })
    } catch {
      sock.sendMessage(jid, { text: "❌ Conversion failed. Check currency codes." })
    }
  }
}
