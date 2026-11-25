/**
 * .dizzy — reaction gif (multi-provider)
 */
const ezapi = require("../../lib/ezapi")
module.exports = {
  name: "dizzy",
  category: "reactions",
  description: "💫 dizzy reaction",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
    const who = target ? "@" + String(target).split("@")[0] : "the air"
    await sock.sendMessage(jid, { react: { text: "💫", key: msg.key } }).catch(() => {})
    const gifUrl = await ezapi.tryChain([
      async () => {
        const d = await ezapi.getJSON("https://api.waifu.pics/sfw/dizzy")
        return d?.url || null
      },
      async () => {
        const d = await ezapi.getJSON("https://nekos.best/api/v2/wobble?amount=1")
        return d?.results?.[0]?.url || null
      },
    ], "dizzy")
    if (gifUrl) {
      try {
        const buf = await ezapi.downloadBuffer(gifUrl, { timeout: 40000 })
        return sock.sendMessage(jid, { video: buf, gifPlayback: true, caption: "💫 @" + String(sender).split("@")[0] + " is seeing stars " + who, mentions: target ? [target, sender] : [sender] }, { quoted: msg })
      } catch {
        return sock.sendMessage(jid, { image: { url: gifUrl }, caption: "💫 @" + String(sender).split("@")[0] + " is seeing stars " + who, mentions: target ? [target, sender] : [sender] }, { quoted: msg })
      }
    }
    await sock.sendMessage(jid, { text: "💫 @" + String(sender).split("@")[0] + " is seeing stars " + who + " 💫💫", mentions: target ? [target, sender] : [sender] }, { quoted: msg })
  },
}
