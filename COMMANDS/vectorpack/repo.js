module.exports = {
  name: "repo",
  async execute(sock, msg) {
    sock.sendMessage(msg.key.remoteJid, {text:`📦 *VECTOR MD Repository*\n\n🤖 Bot: VECTOR MD v2.0\n👨‍💻 Developer: CHAD FDEV\n⚙️ Powered by: Baileys\n\n_Type .menu to see all commands_`})
  }
}