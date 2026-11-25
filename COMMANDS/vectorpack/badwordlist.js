module.exports = {
  name: "badwordlist",
  async execute(sock, msg) {
    const list = global.badWords
    if (!list.length) return sock.sendMessage(msg.key.remoteJid, { text: "📋 Bad word list is empty.\n\nAdd words with: .addbadword <word>" })
    sock.sendMessage(msg.key.remoteJid, { text: "📋 *Bad Word List (" + list.length + ")*\n\n" + list.map((w,i)=>(i+1)+". "+w).join("\n") })
  }
}
