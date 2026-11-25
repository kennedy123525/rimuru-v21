const games = {}
function card(){const v=Math.floor(Math.random()*13)+1;const n=v===1?"A":v===11?"J":v===12?"Q":v===13?"K":v;const s=["♠️","♥️","♦️","♣️"][Math.floor(Math.random()*4)];const val=v>=10?10:v===1?11:v;return{name:`${n}${s}`,val}}
function total(hand){let t=hand.reduce((s,c)=>s+c.val,0);hand.filter(c=>c.val===11).forEach(()=>{if(t>21)t-=10});return t}
module.exports = {
  name: "blackjack",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    if (!games[jid]||args[0]==="start") {
      const player=[card(),card()],dealer=[card(),card()]
      games[jid]={player,dealer}
      const pt=total(player)
      return sock.sendMessage(jid, { text: `🃏 *Blackjack!*\n\nYour hand: ${player.map(c=>c.name).join(" ")} = *${pt}*\nDealer shows: ${dealer[0].name} ??\n\n.blackjack hit — draw card\n.blackjack stand — end turn` })
    }
    const g=games[jid]
    if(args[0]==="hit"){
      g.player.push(card())
      const pt=total(g.player)
      if(pt>21){delete games[jid];return sock.sendMessage(jid,{text:`🃏 *Bust!* You went over 21 (${pt})\nDealer wins! 😔\n\nPlay again: .blackjack start`})}
      return sock.sendMessage(jid,{text:`Your hand: ${g.player.map(c=>c.name).join(" ")} = *${pt}*\n\n.blackjack hit or .blackjack stand`})
    }
    if(args[0]==="stand"){
      let dt=total(g.dealer)
      while(dt<17){g.dealer.push(card());dt=total(g.dealer)}
      const pt=total(g.player)
      delete games[jid]
      const result=dt>21?`🎉 Dealer busts (${dt})! *You win!*`:pt>dt?`🎉 *You win!* ${pt} vs ${dt}`:pt<dt?`😔 *Dealer wins!* ${dt} vs ${pt}`:`🤝 *Draw!* ${pt} each`
      return sock.sendMessage(jid,{text:`🃏 *Blackjack Result*\n\nYour hand: ${g.player.map(c=>c.name).join(" ")} = ${pt}\nDealer: ${g.dealer.map(c=>c.name).join(" ")} = ${dt}\n\n${result}\n\nPlay again: .blackjack start`})
    }
    sock.sendMessage(jid,{text:"Use .blackjack hit or .blackjack stand"})
  }
}
