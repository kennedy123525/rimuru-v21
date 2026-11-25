const baileys = require("@whiskeysockets/baileys")

async function dlMedia(mediaMsg, type) {
  const stream = await baileys.downloadContentFromMessage(mediaMsg, type)
  const chunks = []
  for await (const chunk of stream) chunks.push(chunk)
  return Buffer.concat(chunks)
}

module.exports = {
  name: "😭",
  async execute(sock, msg) {
    const cfg    = require("../../lib/vconfig")
    const jid    = msg.key.remoteJid
    const ctx    = msg.message?.extendedTextMessage?.contextInfo
    let quoted   = ctx?.quotedMessage
    if (!quoted) { await sock.sendMessage(jid, { react: { text: "❓", key: msg.key } }); return }

    try {
      // Unwrap ANY wrapper (viewOnce V1/V2/V2Extension, ephemeral, edits)
      try {
        const norm = baileys.normalizeMessageContent(quoted)
        if (norm && Object.keys(norm).length) quoted = norm
      } catch {}

      const viewOnce =
        quoted?.viewOnceMessage?.message ||
        quoted?.viewOnceMessageV2?.message ||
        quoted?.viewOnceMessageV2Extension?.message ||
        quoted

      const imgMsg = viewOnce?.imageMessage
      const vidMsg = viewOnce?.videoMessage
      const audMsg = viewOnce?.audioMessage
      if (!imgMsg && !vidMsg && !audMsg) { await sock.sendMessage(jid, { react: { text: "❌", key: msg.key } }); return }

      const dmJid  = cfg.ownerNumber + "@s.whatsapp.net"

      if (imgMsg) {
        const buffer = await dlMedia(imgMsg, "image")
        await sock.sendMessage(dmJid, { image: buffer, caption: "👁️ view-once from " + jid })
      } else if (vidMsg) {
        const buffer = await dlMedia(vidMsg, "video")
        await sock.sendMessage(dmJid, { video: buffer, caption: "👁️ view-once from " + jid })
      } else {
        const buffer = await dlMedia(audMsg, "audio")
        await sock.sendMessage(dmJid, { audio: buffer, mimetype: audMsg.mimetype || "audio/ogg; codecs=opus", ptt: audMsg.ptt !== false })
      }

      // Silent react, delete command
      await sock.sendMessage(jid, { react: { text: "👁", key: msg.key } })
      await sock.sendMessage(jid, { delete: msg.key }).catch(() => {})
    } catch {
      await sock.sendMessage(jid, { react: { text: "❌", key: msg.key } })
    }
  }
}
