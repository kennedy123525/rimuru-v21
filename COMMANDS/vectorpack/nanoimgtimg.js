const { downloadContentFromMessage } = require("@whiskeysockets/baileys")
const axios = require("axios")
module.exports = {
  name: "nanoimgtimg",
  async execute(sock, msg, args) {
    const jid    = msg.key.remoteJid
    const ctx    = msg.message?.extendedTextMessage?.contextInfo
    const quoted = ctx?.quotedMessage
    const imgMsg = msg.message?.imageMessage || quoted?.imageMessage
    const query  = args.join(" ").trim()
    if (!imgMsg || !query) return sock.sendMessage(jid, { text: "🍌 Usage: Reply to an image with .nanoimgtimg <description>\nExample: .nanoimgtimg Make them dance" })
    await sock.sendMessage(jid, { text: "🍌 *Nano Banana image processing...* ⏳" })
    try {
      // First upload image to get URL
      const stream = await downloadContentFromMessage(imgMsg, "image")
      const chunks = []; for await (const c of stream) chunks.push(c)
      const buf = Buffer.concat(chunks)
      // Upload to catbox or use base64
      let imageUrl = null
      try {
        const form = new (require("form-data"))()
        form.append("reqtype", "fileupload")
        form.append("fileToUpload", buf, { filename: "image.jpg", contentType: "image/jpeg" })
        const upload = await axios.post("https://catbox.moe/user/api.php", form, { headers: form.getHeaders(), timeout: 20000 })
        if (upload.data?.startsWith("http")) imageUrl = upload.data.trim()
      } catch {}
      if (!imageUrl) throw new Error("Could not upload image. Try again.")
      const r = await axios.get(
        "https://omegatech-api.dixonomega.tech/api/ai/nano-banana2?image=" + encodeURIComponent(imageUrl) + "&prompt=" + encodeURIComponent(query),
        { timeout: 30000, headers: { "User-Agent": "Mozilla/5.0" } }
      )
      const taskId = r.data?.task_id
      if (!taskId) throw new Error("No task ID received")
      await sock.sendMessage(jid, { text: "⏳ Processing... Task: " + taskId + "\n\nChecking result in 10 seconds..." })
      await new Promise(res => setTimeout(res, 10000))
      // Check result
      const result = await axios.get(
        "https://omegatech-api.dixonomega.tech/api/ai/nano-banana2/result?task_id=" + taskId,
        { timeout: 20000 }
      )
      const resultImg = result.data?.image || result.data?.result
      if (!resultImg) throw new Error("Result not ready yet. Try again in a few seconds.")
      const finalImg = await axios.get(resultImg, { responseType: "arraybuffer", timeout: 30000 })
      await sock.sendMessage(jid, {
        image: Buffer.from(finalImg.data),
        caption: "🍌 *Nano Banana Image-to-Image*\n\n📝 Prompt: _" + query + "_\n\n_Powered by VECTOR MD_"
      }, { quoted: msg })
    } catch(e) { sock.sendMessage(jid, { text: "❌ Nano img failed: " + e.message }) }
  }
}
