module.exports = {
  name: "jid",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    sock.sendMessage(jid, {text:`🆔 *JID Info*\n\nYour JID: \`${sender}\`\nChat JID: \`${jid}\`\nIs Group: ${jid.endsWith("@g.us")?"Yes":"No"}`})
  }
}