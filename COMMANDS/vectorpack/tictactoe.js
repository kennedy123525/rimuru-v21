const boards = {}
module.exports = {
  name: "tictactoe",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    if (!boards[jid] || args[0] === "start") {
      boards[jid] = { board: Array(9).fill(" "), turn: "X" }
      return sock.sendMessage(jid, { text: displayBoard(boards[jid].board) + "\n\nYou are ❌. Bot is ⭕\nMake a move: .tictactoe <1-9>\n\n1️⃣2️⃣3️⃣\n4️⃣5️⃣6️⃣\n7️⃣8️⃣9️⃣" })
    }
    const pos = parseInt(args[0]) - 1
    const game = boards[jid]
    if (isNaN(pos)||pos<0||pos>8) return sock.sendMessage(jid, { text: "❌ Pick 1-9" })
    if (game.board[pos] !== " ") return sock.sendMessage(jid, { text: "❌ That spot is taken!" })
    game.board[pos] = "X"
    if (checkWin(game.board, "X")) { delete boards[jid]; return sock.sendMessage(jid, { text: displayBoard(game.board) + "\n\n🎉 *You win!*" }) }
    if (game.board.every(c => c !== " ")) { delete boards[jid]; return sock.sendMessage(jid, { text: displayBoard(game.board) + "\n\n🤝 *Draw!*" }) }
    // Bot move
    const empty = game.board.map((c,i)=>c===" "?i:-1).filter(i=>i>=0)
    const bot = empty[Math.floor(Math.random()*empty.length)]
    game.board[bot] = "O"
    if (checkWin(game.board, "O")) { delete boards[jid]; return sock.sendMessage(jid, { text: displayBoard(game.board) + "\n\n🤖 *Bot wins!*" }) }
    if (game.board.every(c => c !== " ")) { delete boards[jid]; return sock.sendMessage(jid, { text: displayBoard(game.board) + "\n\n🤝 *Draw!*" }) }
    sock.sendMessage(jid, { text: displayBoard(game.board) + "\n\nYour turn! .tictactoe <1-9>" })
  }
}
function displayBoard(b) {
  const sym = c => c==="X"?"❌":c==="O"?"⭕":"⬜"
  return `${sym(b[0])}${sym(b[1])}${sym(b[2])}\n${sym(b[3])}${sym(b[4])}${sym(b[5])}\n${sym(b[6])}${sym(b[7])}${sym(b[8])}`
}
function checkWin(b, p) {
  const wins=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
  return wins.some(w=>w.every(i=>b[i]===p))
}
