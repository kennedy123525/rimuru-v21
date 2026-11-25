/**
 * .delprem — revoke premium (owner only)
 */
const fs = require("fs")
const path = require("path")
const PREM_FILE = path.join(__dirname, "..", "lib", "premium.json")
function loadPrem() { try { return JSON.parse(fs.readFileSync(PREM_FILE, "utf8")) } catch { return [] } }
function savePrem(a) { fs.writeFileSync(PREM_FILE, JSON.stringify(a, null, 1)) }
global.getNum = global.getNum || (j => String(j || "").replace(/:\d+@/, "@").split("@")[0].replace(/\D/g, ""))

module.exports = {
  name: "delprem",
  category: "owner",
  description: "Revoke premium access (owner only)",
  async execute(sock, msg, args, sender, ctx) {
    const jid = msg.key.remoteJid
    const cfg = require("../../lib/vconfig")
    const num = ctx?.senderNum || global.getNum(sender)
    if (num !== String(cfg.ownerNumber)) return sock.sendMessage(jid, { text: "🔒 Owner only command." }, { quoted: msg })
    const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
    const number = target ? global.getNum(target) : (args[0] || "").replace(/[^0-9]/g, "")
    if (!number) return sock.sendMessage(jid, { text: "👑 Usage: .delprem <number>" }, { quoted: msg })
    const list = loadPrem()
    const entry = number + "@s.whatsapp.net"
    const idx = list.indexOf(entry)
    if (idx === -1) return sock.sendMessage(jid, { text: "❌ @" + number + " is not premium.", mentions: [entry] }, { quoted: msg })
    list.splice(idx, 1); savePrem(list)
    global.premiumUsers = list
    await sock.sendMessage(jid, { text: "🗑️ Premium revoked for @" + number + ".", mentions: [entry] }, { quoted: msg })
  },
}
