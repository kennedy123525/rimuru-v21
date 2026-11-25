/**
 * .addprem — grant premium to a user (owner only)
 */
const fs = require("fs")
const path = require("path")
const PREM_FILE = path.join(__dirname, "..", "lib", "premium.json")

function loadPrem() { try { return JSON.parse(fs.readFileSync(PREM_FILE, "utf8")) } catch { return [] } }
function savePrem(a) { fs.writeFileSync(PREM_FILE, JSON.stringify(a, null, 1)) }
global.getNum = global.getNum || (j => String(j || "").replace(/:\d+@/, "@").split("@")[0].replace(/\D/g, ""))

module.exports = {
  name: "addprem",
  category: "owner",
  description: "Grant premium access (owner only)",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    const cfg = require("../../lib/vconfig")
    const num = ctx?.senderNum || global.getNum(sender)
    if (num !== String(cfg.ownerNumber)) return sock.sendMessage(jid, { text: "🔒 Owner only command." }, { quoted: msg })
    let target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
    let raw = (args[0] || "").replace(/[^0-9]/g, "")
    const number = target ? global.getNum(target) : raw
    if (!number || number.length < 7) return sock.sendMessage(jid, { text: "👑 Usage: .addprem <number> or reply/mention the user" }, { quoted: msg })
    const list = loadPrem()
    const entry = number + "@s.whatsapp.net"
    if (list.includes(entry)) return sock.sendMessage(jid, { text: "✅ @" + number + " is already premium.", mentions: [entry] }, { quoted: msg })
    list.push(entry); savePrem(list)
    global.premiumUsers = list
    await sock.sendMessage(jid, { text: "🌟 *PREMIUM GRANTED*\n\n👑 @" + number + " is now a VECTOR MD premium user!\n🔓 Unlimited access unlocked.", mentions: [entry] }, { quoted: msg })
  },
}
