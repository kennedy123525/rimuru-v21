module.exports = {
  name: "steganography",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    sock.sendMessage(jid, {
      text: "🕵️ *Steganography Info*\n\n" +
            "Steganography is hiding secret data inside ordinary files.\n\n" +
            "*Common techniques:*\n" +
            "• LSB (Least Significant Bit) in images\n" +
            "• Hiding text in image metadata\n" +
            "• Audio steganography\n" +
            "• Whitespace steganography in text\n\n" +
            "*Detection tools:*\n" +
            "• StegSolve, Steghide, zsteg\n" +
            "• ExifTool (metadata)\n" +
            "• Binwalk (file carving)\n\n" +
            "💡 Use .hashid to identify file hashes\n" +
            "💡 Use .b64 for base64 encoding/decoding"
    })
  }
}
