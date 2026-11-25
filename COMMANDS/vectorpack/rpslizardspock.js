module.exports = {
  name: "rpsls",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    const choices = ["rock","paper","scissors","lizard","spock"]
    const emojis = {rock:"🪨",paper:"📄",scissors:"✂️",lizard:"🦎",spock:"🖖"}
    const beats = {rock:["scissors","lizard"],paper:["rock","spock"],scissors:["paper","lizard"],lizard:["paper","spock"],spock:["scissors","rock"]}
    const p = args[0]?.toLowerCase()
    if (!choices.includes(p)) return sock.sendMessage(jid, { text: "Usage: .rpsls <rock/paper/scissors/lizard/spock>" })
    const bot = choices[Math.floor(Math.random()*5)]
    const win = beats[p].includes(bot)
    const tie = p === bot
    const result = tie?"🤝 Tie!":win?"🎉 You WIN!":"😅 Bot WINS!"
    sock.sendMessage(jid, { text: `🎮 *Rock Paper Scissors Lizard Spock!*\n\nYou: ${emojis[p]} ${p}\nBot: ${emojis[bot]} ${bot}\n\n${result}` })
  }
}
