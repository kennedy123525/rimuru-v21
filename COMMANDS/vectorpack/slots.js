module.exports = {
  name: "slots",
  async execute(sock, msg) {
    const symbols = ["🍒","🍋","🍊","🍇","⭐","💎","🔔","7️⃣"]
    const spin = () => symbols[Math.floor(Math.random()*symbols.length)]
    const s1=spin(), s2=spin(), s3=spin()
    const win = s1===s2&&s2===s3
    const almost = s1===s2||s2===s3||s1===s3
    const result = win?"🎉 *JACKPOT! YOU WIN!* 🎉":almost?"😅 Almost! Try again!":"😔 No luck. Try again!"
    sock.sendMessage(msg.key.remoteJid, { text: `🎰 *Slot Machine*\n\n| ${s1} | ${s2} | ${s3} |\n\n${result}` })
  }
}
