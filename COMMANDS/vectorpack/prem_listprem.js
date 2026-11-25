/**
 * .listprem — show premium users
 */
const fs = require("fs")
const path = require("path")
const PREM_FILE = path.join(__dirname, "..", "lib", "premium.json")

module.exports = {
  name: "listprem",
  category: "owner",
  description: "List premium users",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    let list = []
    try { list = JSON.parse(fs.readFileSync(PREM_FILE, "utf8")) } catch {}
    if (!list.length) return sock.sendMessage(jid, { text: "🌟 No premium users yet. Owner can add: *.addprem <number>*" }, { quoted: msg })
    let t = "🌟 *VECTOR PREMIUM USERS*\n\n"
    list.forEach((j, i) => { t += (i + 1) + ". @" + String(j).split("@")[0] + "\n" })
    await sock.sendMessage(jid, { text: t, mentions: list }, { quoted: msg })
  },
}
