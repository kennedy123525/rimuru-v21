module.exports = {
  name: "lottery",
  async execute(sock, msg, args) {
    const ticket = args.join(" ").split(" ").map(Number).filter(n=>n>=1&&n<=49).slice(0,6)
    if (ticket.length < 6) return sock.sendMessage(msg.key.remoteJid, { text: "Usage: .lottery 1 2 3 4 5 6\nPick 6 numbers between 1-49" })
    const draw = []
    while(draw.length<6){const n=Math.floor(Math.random()*49)+1;if(!draw.includes(n))draw.push(n)}
    draw.sort((a,b)=>a-b)
    const matches = ticket.filter(n=>draw.includes(n)).length
    const prize = matches===6?"🏆 JACKPOT! You won!":matches===5?"💰 5 matches! Big winner!":matches===4?"🎉 4 matches! Nice!":matches===3?"😊 3 matches!":matches>=1?`${matches} match${matches>1?"es":""}. Keep trying!`:"😔 No matches. Try again!"
    sock.sendMessage(msg.key.remoteJid, { text: `🎰 *Lottery!*\n\nYour numbers: ${ticket.join(" - ")}\nDraw: ${draw.join(" - ")}\n\nMatches: ${matches}/6\n${prize}` })
  }
}
