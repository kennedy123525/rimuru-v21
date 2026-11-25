const { downloadContentFromMessage } = require("@whiskeysockets/baileys")
const { isPaired } = require("../../lib/auth")
async function dlMedia(m, t) { const s=await downloadContentFromMessage(m,t); const c=[]; for await(const x of s)c.push(x); return Buffer.concat(c) }
module.exports = {
  name: "gcstatus",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    if (!isPaired(sender)) return sock.sendMessage(jid, { text: "❌ Paired users only!" })
    const ctx    = msg.message?.extendedTextMessage?.contextInfo
    const quoted = ctx?.quotedMessage
    const imgMsg = msg.message?.imageMessage || quoted?.imageMessage
    const vidMsg = msg.message?.videoMessage || quoted?.videoMessage
    const audMsg = msg.message?.audioMessage || quoted?.audioMessage
    const caption = args.join(" ") || "📢 VECTOR MD 🤖"
    if (!imgMsg && !vidMsg && !audMsg && !caption.trim()) {
      return sock.sendMessage(jid, {
        text: "📢 *gcstatus / gst / gstatus*\n\n" +
              "• .gcstatus [text] → text status\n" +
              "• Reply to image + .gcstatus → image status\n" +
              "• Reply to video + .gcstatus → video status\n" +
              "• Reply to audio + .gcstatus → audio status\n\n" +
              "_Note: Set WhatsApp → Privacy → Status → My Contacts_"
      })
    }
    await sock.sendMessage(jid, { react: { text: "⏳", key: msg.key } })
    const errors = []
    let success = false
    try {
      if (imgMsg) {
        const buf = await dlMedia(imgMsg, "image")
        // Try method 1: direct sendMessage
        try {
          await sock.sendMessage("status@broadcast", { image: buf, caption })
          success = true
        } catch(e1) {
          errors.push("m1: "+e1.message.slice(0,30))
          // Try method 2: with contextInfo
          try {
            await sock.sendMessage("status@broadcast", { image: buf, caption, contextInfo: { isGroupStatus: true } })
            success = true
          } catch(e2) { errors.push("m2: "+e2.message.slice(0,30)) }
        }
      } else if (vidMsg) {
        const buf = await dlMedia(vidMsg, "video")
        try {
          await sock.sendMessage("status@broadcast", { video: buf, caption })
          success = true
        } catch(e1) {
          try {
            await sock.sendMessage("status@broadcast", { video: buf, caption, gifPlayback: false })
            success = true
          } catch(e2) { errors.push(e2.message.slice(0,40)) }
        }
      } else if (audMsg) {
        const buf = await dlMedia(audMsg, "audio")
        try { await sock.sendMessage("status@broadcast", { audio: buf, mimetype:"audio/mpeg", ptt:false }); success = true } catch(e) { errors.push(e.message.slice(0,40)) }
      } else {
        // Text status
        try {
          const msgId = "3EB0" + Math.random().toString(36).slice(2,15)
          await sock.relayMessage("status@broadcast", {
            groupStatusMessageV2: {
              message: { extendedTextMessage: { text: caption, backgroundArgb: 0xFF000000, textArgb: 0xFFFFFFFF, font: 1 } }
            }
          }, { messageId: msgId })
          success = true
        } catch(e1) {
          try { await sock.sendMessage("status@broadcast", { text: caption }); success = true } catch(e2) { errors.push(e2.message.slice(0,40)) }
        }
      }
      if (success) {
        await sock.sendMessage(jid, { react: { text: "✅", key: msg.key } })
        await sock.sendMessage(jid, { text: "✅ *Status posted!* 📢\n\n_Note: Make sure Privacy → Status → My Contacts is set_\n_Powered by VECTOR MD_" })
      } else {
        throw new Error("All methods failed: " + errors.join(", "))
      }
    } catch(e) {
      await sock.sendMessage(jid, { react: { text: "❌", key: msg.key } })
      await sock.sendMessage(jid, { text: "❌ Status failed: " + e.message + "\n\n💡 Fix:\n1. Open WhatsApp Settings\n2. Privacy → Status\n3. Set to *My Contacts*\n4. Try again" })
    }
  }
}
