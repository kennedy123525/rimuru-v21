module.exports = {
  name: "bankhack",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    const ctx = msg.message?.extendedTextMessage?.contextInfo
    const target = ctx?.participant || sender
    const banks = ["GTBank","Access Bank","Zenith Bank","First Bank","UBA","Opay","Palmpay","Kuda"]
    const bank  = banks[Math.floor(Math.random()*banks.length)]
    const bal   = (Math.random()*500000+50000).toFixed(2)
    const steps = [
      "🏦 *[BANK BREACH INITIATED]*\n\n🎯 Target: @"+target.split("@")[0]+"\n🏛️ Bank: "+bank+"\n⏳ Accessing account...",
      "💳 *Account Access Granted!*\n\n💰 Balance: ₦"+parseFloat(bal).toLocaleString()+"\n📊 Last transaction: ₦"+(Math.random()*50000+1000).toFixed(0)+" debit\n🔑 BVN: ***-***-"+Math.floor(Math.random()*9000+1000)+"\n⚠️ Initiating transfer...",
      "✅ *Transfer in progress...*\n\n💸 Sending ₦"+parseFloat(bal).toLocaleString()+" to:\nAccount: 0000000VECTOR\nBank: VECTOR BANK LTD\n\n⏳ 3... 2... 1...",
      "😂😂😂 *PRANK!!* 😂😂😂\n\n@"+target.split("@")[0]+" YOUR MONEY IS SAFE! 😅\n\nWe didn't touch anything! 🔒\nGot you good though! 🤣\n\n_VECTOR MD Pranks 🤖_"
    ]
    for (let i = 0; i < steps.length; i++) {
      await new Promise(r => setTimeout(r, 2500))
      await sock.sendMessage(jid, { text: steps[i], mentions: [target] })
    }
  }
}
