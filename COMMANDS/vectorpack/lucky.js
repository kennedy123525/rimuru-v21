module.exports = {
  name: "lucky",
  async execute(sock, msg, args) {
    const name = args.join(" ") || msg.pushName || "You"
    const nums = Array.from({length:6}, () => Math.floor(Math.random()*49)+1).sort((a,b)=>a-b)
    const colors = ["Red 🔴","Blue 🔵","Green 🟢","Gold 🟡","Purple 🟣","White ⚪","Black ⚫","Orange 🟠"]
    const color = colors[Math.floor(Math.random()*colors.length)]
    const dirs = ["North ⬆️","South ⬇️","East ➡️","West ⬅️"]
    const dir = dirs[Math.floor(Math.random()*dirs.length)]
    const hour = Math.floor(Math.random()*12)+1
    sock.sendMessage(msg.key.remoteJid, { text: "🍀 *Lucky Reading for " + name + "*\n\n🔢 Lucky numbers: " + nums.join(" - ") + "\n🎨 Lucky color: " + color + "\n🧭 Lucky direction: " + dir + "\n⏰ Lucky hour: " + hour + ":00\n\n✨ Go make it happen!" })
  }
}
