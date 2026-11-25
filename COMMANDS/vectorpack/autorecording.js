module.exports = {
  name: "autorecording",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    const cfg = require("../../lib/vconfig")
    const norm = j => j ? j.replace(/:\d+@/, "@") : ""
    const isPaired = norm(sender).split("@")[0] === cfg.ownerNumber || (global.pairedUsers||[]).some(u => norm(u)===norm(sender))
    if (!isPaired) return sock.sendMessage(jid, { text: "❌ Paired users only!" })
    if (!global.autoSettings) global.autoSettings = {}
    const on = (args[0]||"").toLowerCase() === "on"
    const off = (args[0]||"").toLowerCase() === "off"
    if (!on && !off) return sock.sendMessage(jid, { text: "Usage: .autorecording on/off" })
    global.autoSettings["autorecording"] = on
    if ("recording" === "typing") {
      if (on) {
        global._autoTypingInterval = setInterval(async () => {
          try { await sock.sendPresenceUpdate("composing", jid) } catch {}
        }, 10000)
      } else { clearInterval(global._autoTypingInterval) }
    }
    if ("recording" === "recording") {
      if (on) {
        global._autoRecordInterval = setInterval(async () => {
          try { await sock.sendPresenceUpdate("recording", jid) } catch {}
        }, 10000)
      } else { clearInterval(global._autoRecordInterval) }
    }
    if ("recording" === "status") {
      if (on) {
        sock.ev.on("messages.upsert", async ({ messages, type }) => {
          if (!global.autoSettings?.autolikestatus) return
          for (const msg of messages) {
            if (msg.key.remoteJid === "status@broadcast") {
              try { await sock.sendMessage("status@broadcast", { react: { text: "❤️", key: msg.key } }) } catch {}
            }
          }
        })
      }
    }
    sock.sendMessage(jid, { text: (on ? "✅" : "❌") + " *autorecording* turned " + (on?"ON":"OFF") + "!" })
  }
}
