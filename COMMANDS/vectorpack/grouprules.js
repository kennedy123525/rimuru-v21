module.exports = {
  name: "grouprules",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid
    const p   = global.currentPrefix || "."
    const defaultRules =
      "1️⃣ Be respectful to all members\n" +
      "2️⃣ No spamming or flooding\n" +
      "3️⃣ No sharing of inappropriate content\n" +
      "4️⃣ No advertising without admin approval\n" +
      "5️⃣ No sharing of external links without permission\n" +
      "6️⃣ Listen to admins and bot commands\n" +
      "7️⃣ Stay on topic\n" +
      "8️⃣ Have fun and be kind! 🎉"
    const rules = global.groupRules?.[jid] || defaultRules
    await sock.sendMessage(jid, {
      text: "📋 *Group Rules*\n\n" + rules + "\n\n_Use " + p + "editgrouprules to update | " + p + "resetgrouprules to reset_\n_Powered by VECTOR MD_"
    })
  }
}
