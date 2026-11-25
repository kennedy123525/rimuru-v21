module.exports = {
  name: "tip",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    if (args.length < 1) return sock.sendMessage(jid, { text: "Usage: .tip <bill> [tip%] [people]\nExample: .tip 5000 15 4" })
    const bill = parseFloat(args[0]), tipPct = parseFloat(args[1]) || 15, people = parseInt(args[2]) || 1
    const tipAmt = (bill * tipPct / 100).toFixed(2)
    const total = (bill + parseFloat(tipAmt)).toFixed(2)
    const perPerson = (total / people).toFixed(2)
    sock.sendMessage(jid, { text: "💰 *Tip Calculator*\n\nBill: " + bill + "\nTip (" + tipPct + "%): " + tipAmt + "\nTotal: *" + total + "*\nPer person (" + people + "): *" + perPerson + "*" })
  }
}
