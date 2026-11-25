const dl = require("../../lib/downloader")

module.exports = {
  name: "apk",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    const query = args.join(" ").trim()
    if (!query) return sock.sendMessage(jid, { text: "Usage: .apk <app name>\nExample: .apk WhatsApp" })
    await sock.sendMessage(jid, { react: { text: "🔍", key: msg.key } })
    await sock.sendMessage(jid, { text: "🔍 Searching APK: _" + query + "_..." })
    try {
      const apps = await dl.apkSearch(query)
      const list = apps.map((a, i) =>
        (i + 1) + ". *" + a.name + "* (" + a.package + ")\n    v" + (a.version || "?") + (a.sizeMB ? " • " + a.sizeMB + " MB" : "")
      ).join("\n")
      await sock.sendMessage(jid, { text: "📱 *APK Results*\n\n" + list + "\n\n⬇️ Downloading *#" + 1 + " " + apps[0].name + "*..." })
      await sock.sendMessage(jid, { react: { text: "⏳", key: msg.key } })

      const app = await dl.apkGet(query)
      if (app.sizeMB > 350) {
        return sock.sendMessage(jid, { text: "❌ *" + app.name + "* is " + app.sizeMB + " MB - too big to send.\n\n🔗 Direct link:\n" + app.url })
      }
      const buf = await dl.dlBuffer(app.url, { timeout: 300000, maxBytes: 400 * 1024 * 1024, minBytes: 50000 })
      await sock.sendMessage(jid, {
        document: buf,
        mimetype: "application/vnd.android.package-archive",
        fileName: app.name.replace(/[^\w\s.-]/g, "") + "-" + (app.version || "apk") + ".apk",
        caption: "📱 *" + app.name + "* v" + (app.version || "?") + " (" + app.sizeMB + " MB)\n\n_Powered by VECTOR MD_"
      }, { quoted: msg })
      await sock.sendMessage(jid, { react: { text: "✅", key: msg.key } })
    } catch (e) {
      await sock.sendMessage(jid, { react: { text: "❌", key: msg.key } })
      await sock.sendMessage(jid, { text: "❌ APK failed: " + e.message + "\n\n🔗 Search manually:\nhttps://apkpure.com/search?q=" + encodeURIComponent(query) })
    }
  }
}
