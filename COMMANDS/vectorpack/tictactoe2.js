module.exports = {
  name: "ttt",
  async execute(sock, msg, args) {
    const j = msg.key.remoteJid
    if (!global._ttt) global._ttt = {}
    if (args[0] === "start" || !global._ttt[j]) {
      global._ttt[j] = { board: ["1","2","3","4","5","6","7","8","9"], over: false }
      const b = global._ttt[j].board
      return sock.sendMessage(j, { text: "❎⭕ *Tic Tac Toe*\nYou=X  Bot=O\n\n"+b.slice(0,3).join("|")+"\n"+b.slice(3,6).join("|")+"\n"+b.slice(6,9).join("|")+"\n\n.ttt <1-9> to play" })
    }
    const g = global._ttt[j]
    if (g.over) return sock.sendMessage(j, { text: "Game over! .ttt start for new game" })
    const pos = parseInt(args[0]) - 1
    const valid = ["1","2","3","4","5","6","7","8","9"]
    if (isNaN(pos) || pos < 0 || pos > 8 || !valid.includes(g.board[pos]))
      return sock.sendMessage(j, { text: "❌ Invalid move 1-9" })
    g.board[pos] = "X"
    const win = b => [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]].some(l => b[l[0]]===b[l[1]]&&b[l[1]]===b[l[2]])
    const disp = b => b.slice(0,3).join("|")+"\n"+b.slice(3,6).join("|")+"\n"+b.slice(6,9).join("|")
    if (win(g.board)) { g.over = true; return sock.sendMessage(j, { text: "🎉 *You WIN!*\n\n"+disp(g.board) }) }
    const empty = g.board.map((v,i) => valid.includes(v) ? i : -1).filter(i => i >= 0)
    if (!empty.length) { g.over = true; return sock.sendMessage(j, { text: "🤝 *Draw!*\n\n"+disp(g.board) }) }
    g.board[empty[Math.floor(Math.random()*empty.length)]] = "O"
    if (win(g.board)) { g.over = true; return sock.sendMessage(j, { text: "😢 *Bot WINS!*\n\n"+disp(g.board) }) }
    const empty2 = g.board.filter(v => valid.includes(v))
    if (!empty2.length) { g.over = true; return sock.sendMessage(j, { text: "🤝 *Draw!*\n\n"+disp(g.board) }) }
    sock.sendMessage(j, { text: "❎⭕ *Tic Tac Toe*\n\n"+disp(g.board)+"\n\n.ttt <1-9> your turn" })
  }
}
