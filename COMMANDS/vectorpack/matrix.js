module.exports = {
  name: "matrix",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()"
    const genLine = () => Array.from({length:40},()=>chars[Math.floor(Math.random()*chars.length)]).join("")
    const lines = Array.from({length:8},()=>genLine()).join("\n")
    await sock.sendMessage(jid, {
      text: "💻 *MATRIX MODE ACTIVATED*\n\n```\n"+lines+"\n```\n\n⚠️ Accessing the mainframe...\n\n_You have been chosen, Neo_ 🔴💊"
    })
    await new Promise(r=>setTimeout(r,3000))
    await sock.sendMessage(jid, {
      text: "😂 *PRANK!* 😂\n\nWelcome to the real world! 🌍\n\n_Nothing happened to your phone!_\n\n*Powered by VECTOR MD* 🤖"
    })
  }
}
