module.exports = {
  name: "rps",
  async execute(sock, msg, args) {
    const choices = ["rock","paper","scissors"]
    const emojis = {rock:"🪨",paper:"📄",scissors:"✂️"}
    const player = args[0]?.toLowerCase()
    if (!choices.includes(player)) return sock.sendMessage(msg.key.remoteJid, {text:"Usage: .rps rock/paper/scissors"})
    const bot = choices[Math.floor(Math.random()*3)]
    const win = (player==="rock"&&bot==="scissors")||(player==="paper"&&bot==="rock")||(player==="scissors"&&bot==="paper")
    const result = player===bot ? "🤝 Tie!" : win ? "🎉 You WIN!" : "😅 You LOSE!"
    sock.sendMessage(msg.key.remoteJid, {text:`🎮 *Rock Paper Scissors*\n\nYou: ${emojis[player]} ${player}\nBot: ${emojis[bot]} ${bot}\n\n${result}`})
  }
}