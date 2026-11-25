/**
 * .happy — reaction gif (multi-provider)
 */
const ezapi = require("../../lib/ezapi")
module.exports = {
  name: "happy",
  category: "reactions",
  description: "😄 happy reaction",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
    const who = target ? "@" + String(target).split("@")[0] : "the air"
    await sock.sendMessage(jid, { react: { text: "😄", key: msg.key } }).catch(() => {})
    const gifUrl = await ezapi.tryChain([
      async () => {
        const d = await ezapi.getJSON("https://api.waifu.pics/sfw/smile")
        return d?.url || null
      },
      async () => {
        const d = await ezapi.getJSON("https://nekos.best/api/v2/wave?amount=1")
        return d?.results?.[0]?.url || null
      },
    ], "happy")
    if (gifUrl) {
      try {
        const buf = await ezapi.downloadBuffer(gifUrl, { timeout: 40000 })
        return sock.sendMessage(jid, { video: buf, gifPlayback: true, caption: "😄 @" + String(sender).split("@")[0] + " is beaming with joy " + who, mentions: target ? [target, sender] : [sender] }, { quoted: msg })
      } catch {
        return sock.sendMessage(jid, { image: { url: gifUrl }, caption: "😄 @" + String(sender).split("@")[0] + " is beaming with joy " + who, mentions: target ? [target, sender] : [sender] }, { quoted: msg })
      }
    }
    await sock.sendMessage(jid, { text: "😄 @" + String(sender).split("@")[0] + " is beaming with joy " + who + " 😄😄", mentions: target ? [target, sender] : [sender] }, { quoted: msg })
  },
}
