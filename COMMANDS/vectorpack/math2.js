module.exports = {
  name: "math2",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    const n = parseFloat(args[0])
    const op = args[1]?.toLowerCase()
    if (isNaN(n) || !op) return sock.sendMessage(jid, { text: "Usage: .math2 <number> <operation>\nOps: sqrt, square, cube, factorial, prime, fibonacci" })
    let result = ""
    if (op === "sqrt") result = "√" + n + " = " + Math.sqrt(n).toFixed(4)
    else if (op === "square") result = n + "² = " + (n*n)
    else if (op === "cube") result = n + "³ = " + (n*n*n)
    else if (op === "factorial") {
      if (n > 20 || n < 0 || !Number.isInteger(n)) return sock.sendMessage(jid, { text: "❌ Factorial: integer 0-20 only." })
      let f=1; for(let i=2;i<=n;i++) f*=i
      result = n + "! = " + f
    }
    else if (op === "prime") {
      if (n < 2) { result = n + " is NOT prime." }
      else { let p=true; for(let i=2;i<=Math.sqrt(n);i++) if(n%i===0){p=false;break}; result = n + (p?" IS prime! ✅":" is NOT prime.") }
    }
    else if (op === "fibonacci") {
      const k = Math.min(parseInt(n), 20)
      let seq=[0,1]; for(let i=2;i<k;i++) seq.push(seq[i-1]+seq[i-2])
      result = "Fibonacci(" + k + "): " + seq.join(", ")
    }
    else return sock.sendMessage(jid, { text: "Unknown op. Try: sqrt, square, cube, factorial, prime, fibonacci" })
    sock.sendMessage(jid, { text: "🔢 *Math*\n\n" + result })
  }
}
