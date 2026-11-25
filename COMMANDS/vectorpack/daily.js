module.exports = {
  name: "daily",
  async execute(sock, msg, args, sender) {
    const db = global._dailyDB || {}
    const today = new Date().toDateString()
    const key = sender + "_" + today
    if (db[key]) return sock.sendMessage(msg.key.remoteJid, { text: "⏰ You already claimed your daily reward today!\n\nCome back tomorrow! 🌅" })
    db[key] = true
    global._dailyDB = db
    const coins = Math.floor(Math.random()*500)+100
    const items = ["🎁 Mystery Box","⭐ Lucky Star","💎 Diamond Shard","🍀 Four-leaf Clover","🎪 Fun Pass"]
    const item = items[Math.floor(Math.random()*items.length)]
    sock.sendMessage(msg.key.remoteJid, { text: "🎉 *Daily Reward Claimed!*\n\n💰 Coins: +" + coins + "\n" + item + "\n\n_Come back tomorrow for more!_" })
  }
}
