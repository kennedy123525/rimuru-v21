module.exports = {
  name: "whitelist",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    if (!jid.endsWith("@g.us")) return sock.sendMessage(jid, { text: "❌ Groups only fam!" })
    const cfg = require("../../lib/vconfig")
    const norm = j => j ? j.replace(/:\d+@/, "@") : ""
    const sNorm = norm(sender)
    const isPaired = sNorm === cfg.ownerNumber+"@s.whatsapp.net" || sNorm.startsWith(cfg.ownerNumber+"@") ||
                     (global.pairedUsers||[]).some(u => norm(u) === sNorm || norm(u).split("@")[0] === sNorm.split("@")[0])
    if (!isPaired) return sock.sendMessage(jid, { text: "❌ Paired users only!" })
    if (!global.whitelist) global.whitelist = {}
    const action = args[0]?.toLowerCase()

    if (!action || action === "list") {
      const wl = global.whitelist[jid]
      if (!wl) return sock.sendMessage(jid, { text: "🔓 *Whitelist Status*\n\nNo restrictions active!\nEveryone can use the bot here. 🤖" })
      if (wl === "all") return sock.sendMessage(jid, { text: "🔒 *Whitelist: ALL BLOCKED*\n\nEveryone locked out except owner.\nUse *.whitelist clear* to open up." })
      return sock.sendMessage(jid, { text: "🚫 *Blocked Users:*\n\n" + [...wl].map((n,i)=>(i+1)+". +"+n).join("\n") + "\n\n_.whitelist remove <num>_ to unblock" })
    }
    if (action === "all") { global.whitelist[jid] = "all"; return sock.sendMessage(jid, { text: "🔒 *Locked down!* Everyone blocked except owner." }) }
    if (action === "clear" || action === "off") { delete global.whitelist[jid]; return sock.sendMessage(jid, { text: "🔓 *Whitelist cleared!* Everyone can use the bot again." }) }
    if (action === "add" || /^\d+$/.test(action)) {
      const num = (action==="add" ? args[1] : action)?.replace(/\D/g,"")
      if (!num) {
        const p = msg.message?.extendedTextMessage?.contextInfo?.participant
        if (p) { const pNum = norm(p).split("@")[0]; if(!global.whitelist[jid]||global.whitelist[jid]==="all")global.whitelist[jid]=new Set(); global.whitelist[jid].add(pNum); return sock.sendMessage(jid,{text:"🚫 @"+pNum+" blocked from bot!",mentions:[p]}) }
        return sock.sendMessage(jid,{text:"Usage: .whitelist add <number>"})
      }
      if (!global.whitelist[jid] || global.whitelist[jid]==="all") global.whitelist[jid] = new Set()
      global.whitelist[jid].add(num)
      return sock.sendMessage(jid, { text: "🚫 *+"+num+" blocked!* They can't use bot commands here anymore." })
    }
    if (action==="remove"||action==="unblock") {
      const num = args[1]?.replace(/\D/g,"")
      if (!num) return sock.sendMessage(jid,{text:"Usage: .whitelist remove <number>"})
      if (global.whitelist[jid] instanceof Set) { global.whitelist[jid].delete(num); if(global.whitelist[jid].size===0)delete global.whitelist[jid] }
      return sock.sendMessage(jid,{text:"✅ *+"+num+" unblocked!* They can use the bot again."})
    }
    sock.sendMessage(jid,{text:"🚫 *Whitelist*\n\n.whitelist - show status\n.whitelist add <num> - block user\n.whitelist remove <num> - unblock\n.whitelist all - block everyone\n.whitelist clear - unblock all"})
  }
}
