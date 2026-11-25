const crypto = require("crypto")
module.exports = {
  name: "hash",
  async execute(sock, msg, args) {
    const text = args.join(" ")
    if (!text) return sock.sendMessage(msg.key.remoteJid, { text: "Usage: .hash <text>\nExample: .hash hello world" })
    const md5 = crypto.createHash("md5").update(text).digest("hex")
    const sha1 = crypto.createHash("sha1").update(text).digest("hex")
    const sha256 = crypto.createHash("sha256").update(text).digest("hex")
    sock.sendMessage(msg.key.remoteJid, { text: `#️⃣ *Hash Generator*\n\nText: ${text}\n\nMD5:\n\`${md5}\`\n\nSHA1:\n\`${sha1}\`\n\nSHA256:\n\`${sha256}\`` })
  }
}
