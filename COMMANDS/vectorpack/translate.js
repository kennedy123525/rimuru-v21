const axios = require("axios")
module.exports = {
  name: "translate",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    if (args.length < 2) {
      return sock.sendMessage(jid, {
        text: "🌐 *Translate Command*\n\n" +
              "Usage: .translate <lang> <text>\n\n" +
              "*Available Languages:*\n" +
              "🇳🇬 pidgin = Nigerian Pidgin\n" +
              "🇳🇬 yo = Yoruba\n" +
              "🇳🇬 ha = Hausa\n" +
              "🇳🇬 ig = Igbo\n" +
              "🇬🇧 en = English\n" +
              "🇫🇷 fr = French\n" +
              "🇪🇸 es = Spanish\n" +
              "🇩🇪 de = German\n" +
              "🇧🇷 pt = Portuguese\n" +
              "🇸🇦 ar = Arabic\n" +
              "🇷🇺 ru = Russian\n" +
              "🇨🇳 zh = Chinese\n" +
              "🇯🇵 ja = Japanese\n" +
              "🇰🇷 ko = Korean\n" +
              "🇮🇳 hi = Hindi\n" +
              "🇮🇹 it = Italian\n" +
              "🇹🇷 tr = Turkish\n" +
              "🇳🇱 nl = Dutch\n" +
              "🇵🇱 pl = Polish\n" +
              "🇸🇪 sv = Swedish\n" +
              "🇺🇦 uk = Ukrainian\n" +
              "🇵🇭 tl = Filipino\n" +
              "🇮🇩 id = Indonesian\n" +
              "🇿🇦 zu = Zulu\n" +
              "🇬🇭 tw = Twi (Akan)\n\n" +
              "Example: .translate pidgin Hello my friend"
      })
    }

    const lang = args[0].toLowerCase()
    const text = args.slice(1).join(" ")

    // Nigerian Pidgin special handling (AI-powered)
    if (lang === "pidgin" || lang === "pcm") {
      try {
        const prompt = "Translate this to Nigerian Pidgin Creole English, give only the translation:\n" + text
        const r = await axios.get(
          "https://text.pollinations.ai/" + encodeURIComponent(prompt),
          { timeout: 15000, headers: { "User-Agent": "Mozilla/5.0" } }
        )
        if (r.data && typeof r.data === "string" && r.data.trim()) {
          return sock.sendMessage(jid, {
            text: "🌐 *Translation*\n\n📝 Original:\n" + text + "\n\n🇳🇬 Nigerian Pidgin:\n*" + r.data.trim() + "*"
          })
        }
      } catch {}
      return sock.sendMessage(jid, { text: "❌ Pidgin translation failed. Try again." })
    }

    // Standard translation via MyMemory API (supports 100+ languages)
    const langMap = {
      en:"en-GB", fr:"fr-FR", es:"es-ES", de:"de-DE", pt:"pt-BR",
      ar:"ar-SA", ru:"ru-RU", zh:"zh-CN", ja:"ja-JP", ko:"ko-KR",
      hi:"hi-IN", it:"it-IT", tr:"tr-TR", nl:"nl-NL", pl:"pl-PL",
      sv:"sv-SE", uk:"uk-UA", tl:"tl-PH", id:"id-ID", zu:"zu-ZA",
      yo:"yo-NG", ha:"ha-NG", ig:"ig-NG", tw:"ak-GH"
    }
    const targetLang = langMap[lang] || lang

    try {
      const r = await axios.get(
        "https://api.mymemory.translated.net/get?q=" + encodeURIComponent(text) + "&langpair=en|" + targetLang,
        { timeout: 15000 }
      )
      const translated = r.data?.responseData?.translatedText
      if (!translated || translated === text || translated.includes("INVALID")) {
        // Fallback: use AI translation
        const prompt = "Translate this to " + lang + ", give only the translation:\n" + text
        const aiR = await axios.get("https://text.pollinations.ai/" + encodeURIComponent(prompt), { timeout: 12000, headers: { "User-Agent": "Mozilla/5.0" } })
        if (aiR.data && typeof aiR.data === "string" && aiR.data.trim()) {
          return sock.sendMessage(jid, {
            text: "🌐 *Translation*\n\n📝 Original (EN):\n" + text + "\n\n🔄 " + lang.toUpperCase() + ":\n*" + aiR.data.trim() + "*"
          })
        }
        return sock.sendMessage(jid, { text: "❌ Translation failed. Check language code.\n\nUse .translate for a list of codes." })
      }
      sock.sendMessage(jid, {
        text: "🌐 *Translation*\n\n📝 Original (EN):\n" + text + "\n\n🔄 " + lang.toUpperCase() + ":\n*" + translated + "*"
      })
    } catch(e) {
      sock.sendMessage(jid, { text: "❌ Translation error: " + e.message })
    }
  }
}
