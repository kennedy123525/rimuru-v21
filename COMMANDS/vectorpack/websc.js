const axios = require("axios")
const { isPaired } = require("../../lib/auth")
module.exports = {
  name: "websc",
  async execute(sock, msg, args, sender) {
    const jid = msg.key.remoteJid
    if (!isPaired(sender)) return sock.sendMessage(jid, { text: "❌ Paired users only!" })
    const url = args[0]
    if (!url || !url.startsWith("http")) return sock.sendMessage(jid, {
      text: "🌐 Usage: .websc <url>\nExample: .websc https://example.com"
    })
    await sock.sendMessage(jid, { text: "🌐 *Deep scraping...*\n🔗 " + url })
    try {
      const start = Date.now()
      const r = await axios.get(url, {
        timeout: 20000, maxRedirects: 5,
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
          "Accept": "text/html,application/xhtml+xml,*/*;q=0.9",
          "Accept-Language": "en-US,en;q=0.5",
          "Cache-Control": "no-cache"
        }
      })
      const elapsed = Date.now() - start
      const cheerio = require("cheerio")
      const $ = cheerio.load(r.data)
      $("script,style,nav,footer,header,iframe,noscript,aside,.ads,.advertisement,form,svg").remove()

      const title     = $("title").text().trim()
      const desc      = $('meta[name="description"],meta[property="og:description"]').first().attr("content") || ""
      const keywords  = $('meta[name="keywords"]').attr("content") || ""
      const author    = $('meta[name="author"]').attr("content") || ""
      const canonical = $('link[rel="canonical"]').attr("href") || url
      const ogType    = $('meta[property="og:type"]').attr("content") || ""
      const h1s       = $("h1").map((_,el)=>$(el).text().trim()).get().filter(Boolean)
      const h2s       = $("h2").map((_,el)=>$(el).text().trim()).get().filter(Boolean).slice(0,10)
      const h3s       = $("h3").map((_,el)=>$(el).text().trim()).get().filter(Boolean).slice(0,5)
      const paras     = $("p").map((_,el)=>$(el).text().trim()).get().filter(t=>t.length>50).slice(0,8)
      const links     = []
      $("a[href]").each((_,el) => {
        const href=$(el).attr("href"),text=$(el).text().trim().slice(0,50)
        if (href?.startsWith("http") && links.length < 10) links.push({ text, href })
      })
      const imgs = $("img[src]").map((_,el)=>{const s=$(el).attr("src"),alt=$(el).attr("alt")||"";return s?.startsWith("http")?{src:s,alt}:null}).get().filter(Boolean).slice(0,5)
      const wordCount = $("body").text().replace(/\s+/g," ").split(" ").filter(Boolean).length
      const rawSize   = Math.floor(r.data.length / 1024)
      const status    = r.status
      const ct        = (r.headers?.["content-type"]||"").split(";")[0]
      const server    = r.headers?.["server"] || "?"
      const poweredBy = r.headers?.["x-powered-by"] || ""
      const techStack = []
      if (r.data.includes("wp-content"))  techStack.push("WordPress")
      if (r.data.includes("shopify"))     techStack.push("Shopify")
      if (r.data.includes("react"))       techStack.push("React")
      if (r.data.includes("angular"))     techStack.push("Angular")
      if (r.data.includes("vue"))         techStack.push("Vue.js")
      if (r.data.includes("bootstrap"))   techStack.push("Bootstrap")
      if (r.data.includes("jquery"))      techStack.push("jQuery")
      if (r.data.includes("next"))        techStack.push("Next.js")

      const result =
        "╔═══════════════════════════════╗\n" +
        "║   🌐 *DEEP WEB SCRAPE*         ║\n" +
        "╠═══════════════════════════════╣\n" +
        "║ 🔗 " + url.slice(0,40) + "\n" +
        "║ 📊 Status: *" + status + "* | ⏱️ " + elapsed + "ms\n" +
        "║ 🖥️ Server: *" + server + "*" + (poweredBy ? " | " + poweredBy : "") + "\n" +
        "║ 📦 Size: *~" + rawSize + " KB* | Words: *" + wordCount + "*\n" +
        (techStack.length ? "║ ⚙️ Tech: *" + techStack.join(", ") + "*\n" : "") +
        "╠═══════════════════════════════╣\n" +
        "║ 📌 *TITLE:*\n" +
        "║ " + title.slice(0, 70) + "\n" +
        (desc ? "╠═══════════════════════════════╣\n║ 📋 *DESCRIPTION:*\n║ " + desc.slice(0,200).replace(/\n/g," ") + "\n" : "") +
        (author ? "║ ✍️ Author: *" + author + "*\n" : "") +
        (keywords ? "║ 🏷️ Keywords: " + keywords.slice(0,100) + "\n" : "") +
        (h1s.length ? "╠═══════════════════════════════╣\n║ 📌 *MAIN HEADINGS (" + h1s.length + "):*\n" + h1s.slice(0,5).map(h=>"║ • "+h.slice(0,60)).join("\n") + "\n" : "") +
        (h2s.length ? "╠═══════════════════════════════╣\n║ 📑 *SUB HEADINGS (" + h2s.length + "):*\n" + h2s.slice(0,6).map(h=>"║ • "+h.slice(0,55)).join("\n") + "\n" : "") +
        (paras.length ? "╠═══════════════════════════════╣\n║ 📄 *CONTENT EXTRACT:*\n║ " + paras.slice(0,4).map(p=>p.slice(0,120)).join("\n║ ") + "\n" : "") +
        (links.length ? "╠═══════════════════════════════╣\n║ 🔗 *LINKS (" + links.length + "):*\n" + links.slice(0,6).map(l=>"║ • " + (l.text||"link") + "\n║   → "+l.href.slice(0,55)).join("\n") + "\n" : "") +
        (imgs.length ? "╠═══════════════════════════════╣\n║ 🖼️ *IMAGES (" + imgs.length + "):*\n" + imgs.slice(0,3).map(i=>"║ • " + (i.alt||"img") + ": "+i.src.slice(0,50)).join("\n") + "\n" : "") +
        "╚═══════════════════════════════╝\n" +
        "_Powered by VECTOR MD_"

      await sock.sendMessage(jid, { text: result.slice(0,4000) })
    } catch(e) {
      sock.sendMessage(jid, { text: "❌ Scraping failed: " + e.message })
    }
  }
}
