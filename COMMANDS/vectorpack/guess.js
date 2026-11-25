const active = {}
module.exports = {
  name: "guess",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    if (!active[jid]) {
      active[jid] = { number: Math.floor(Math.random()*100)+1, tries: 0 }
      return sock.sendMessage(jid, {text:"🎮 *Guessing Game*\nI picked 1-100! .guess <number>"})
    }
    const g = parseInt(args[0])
    if (isNaN(g)) return sock.sendMessage(jid, {text:"Enter a number! .guess 50"})
    active[jid].tries++
    if (g === active[jid].number) {
      const t = active[jid].tries; delete active[jid]
      return sock.sendMessage(jid, {text:`🎉 Correct in *${t}* tries!`})
    }
    if (active[jid].tries >= 7) {
      const n = active[jid].number; delete active[jid]
      return sock.sendMessage(jid, {text:`💀 The number was *${n}*! Play again with .guess`})
    }
    sock.sendMessage(jid, {text:`${g<active[jid].number?"📈 Go *higher*!":"📉 Go *lower*!"} (${7-active[jid].tries} tries left)`})
  }
}