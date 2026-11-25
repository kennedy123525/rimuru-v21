module.exports = {
  name: "hashid",
  async execute(sock, msg, args) {
    const jid  = msg.key.remoteJid
    const hash = args[0]
    if (!hash) return sock.sendMessage(jid, { text: "Usage: .hashid <hash>\nExample: .hashid 5f4dcc3b5aa765d61d8327deb882cf99" })
    const len = hash.length
    const types = []
    if (/^[0-9a-f]{32}$/i.test(hash)) types.push("MD5", "NTLM", "MD4")
    if (/^[0-9a-f]{40}$/i.test(hash)) types.push("SHA1", "MySQL5")
    if (/^[0-9a-f]{56}$/i.test(hash)) types.push("SHA224")
    if (/^[0-9a-f]{64}$/i.test(hash)) types.push("SHA256", "SHA3-256")
    if (/^[0-9a-f]{96}$/i.test(hash)) types.push("SHA384")
    if (/^[0-9a-f]{128}$/i.test(hash)) types.push("SHA512", "SHA3-512")
    if (/^\$2[ayb]\$.{56}$/.test(hash)) types.push("bcrypt")
    if (/^\$6\$/.test(hash)) types.push("SHA-512 Crypt")
    if (/^\$1\$/.test(hash)) types.push("MD5 Crypt")
    if (!types.length) types.push("Unknown hash type")
    sock.sendMessage(jid, {
      text: "🔐 *Hash Identifier*\n\n🔑 Hash: `" + hash + "`\n📏 Length: " + len + " chars\n\n💡 *Possible types:*\n" + types.map(t => "• " + t).join("\n")
    })
  }
}
