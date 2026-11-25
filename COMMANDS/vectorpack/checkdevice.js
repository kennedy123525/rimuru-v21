module.exports = {
  name: "checkdevice",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    const ctx = msg.message?.extendedTextMessage?.contextInfo
    const participant = ctx?.participant || sender
    // Baileys stores device info in the message key participant
    // The device suffix: :0 = Web, :2 = Android, :3 = iOS, :1-:5 = various
    const deviceSuffix = msg.key.participant?.match(/:(\d+)@/)?.[1] || participant?.match(/:(\d+)@/)?.[1]
    const quotedPart = ctx?.participant
    const targetSuffix = quotedPart?.match(/:(\d+)@/)?.[1]
    // Also check from message agent in key
    const agentId = msg.key.participant || quotedPart || ""
    const suffix = targetSuffix || deviceSuffix || "0"
    let device, emoji, details
    const s = parseInt(suffix)
    if (s === 0 || s === undefined) { device = "WhatsApp Web/Desktop"; emoji = "💻"; details = "Browser or PC app" }
    else if (s === 2) { device = "Android"; emoji = "🤖"; details = "Android smartphone" }
    else if (s === 3) { device = "iPhone/iOS"; emoji = "🍎"; details = "Apple device" }
    else if (s === 1) { device = "Android (old)"; emoji = "🤖"; details = "Older Android version" }
    else if (s === 4) { device = "iPhone/iPad"; emoji = "🍎📱"; details = "Apple iPhone or iPad" }
    else if (s === 5) { device = "Android/Web"; emoji = "🔵"; details = "Android or Web variant" }
    else { device = "Unknown (" + s + ")"; emoji = "❓"; details = "Device type unclear" }
    const targetNum = (quotedPart || participant || "").replace(/[^0-9]/g,"")
    await sock.sendMessage(jid, {
      text: "📱 *Device Check*\n\n" +
            "👤 Number: +" + targetNum + "\n" +
            "📱 Device: " + emoji + " *" + device + "*\n" +
            "ℹ️ Details: " + details + "\n" +
            "🔢 Agent ID: " + suffix + "\n\n" +
            "_Note: Device detection is based on WhatsApp metadata_\n_Powered by VECTOR MD_"
    })
  }
}
