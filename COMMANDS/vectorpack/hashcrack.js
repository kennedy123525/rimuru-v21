const { isPaired } = require("../../lib/auth")
module.exports = {
  name: "hashid",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    if (!isPaired(sender)) return sock.sendMessage(jid, { text: "❌ Paired users only!" })
    const hash = args[0]
    if (!hash) return sock.sendMessage(jid, { text: "Usage: .hashid <hash>\nExample: .hashid 5d41402abc4b2a76b9719d911017c592" })
    const types = []
    const len = hash.length
    if (/^[a-f0-9]+$/i.test(hash)) {
      if (len===32) types.push("MD5", "MD4", "NTLM")
      if (len===40) types.push("SHA-1", "SHA-0", "RIPEMD-160")
      if (len===56) types.push("SHA-224", "SHA-3/224")
      if (len===64) types.push("SHA-256", "SHA-3/256", "RIPEMD-256")
      if (len===96) types.push("SHA-384")
      if (len===128) types.push("SHA-512", "Whirlpool")
      if (len===16) types.push("MD5 (half)", "MurmurHash")
    }
    if (hash.startsWith("$2a$") || hash.startsWith("$2b$")) types.push("bcrypt")
    if (hash.startsWith("$1$")) types.push("MD5-Crypt")
    if (hash.startsWith("$6$")) types.push("SHA-512-Crypt")
    if (hash.startsWith("sha256:")) types.push("SHA-256 (salted)")
    if (!types.length) types.push("Unknown format")
    await sock.sendMessage(jid, {
      text: "╔════════════════════════╗\n║  🔑 *HASH IDENTIFIER*    ║\n╚════════════════════════╝\n\n" +
            "🔍 Hash: `" + hash.slice(0,64) + "`\n" +
            "📏 Length: *" + len + " chars*\n\n" +
            "🎯 *Possible Types:*\n" + types.map(t=>"• "+t).join("\n") + "\n\n" +
            "💡 *Cracking Resources:*\n" +
            "• CrackStation: crackstation.net\n" +
            "• HashKiller: hashkiller.io\n" +
            "• Hashcat: hashcat.net\n" +
            "• John the Ripper: openwall.com/john\n\n" +
            "_⚠️ Only crack hashes you own!\n_Powered by VECTOR MD_"
    })
  }
}
