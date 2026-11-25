'use strict'
function makeMap(src, dst) {
  const s = Array.from(src), d = Array.from(dst), map = {}
  for (let i = 0; i < s.length; i++) if (d[i]) map[s[i]] = d[i]
  return map
}
const U='ABCDEFGHIJKLMNOPQRSTUVWXYZ', L='abcdefghijklmnopqrstuvwxyz', D='0123456789'
const FONTS = {
  1:{name:'Normal',sample:'VECTOR MD ← (Normal)'},
  2:{name:'Bold',sample:'𝐕𝐄𝐂𝐓𝐎𝐑 𝐌𝐃',charMap:{...makeMap(U,'𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙'),...makeMap(L,'𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳'),...makeMap(D,'𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗')}},
  3:{name:'Italic',sample:'𝑉𝐸𝐶𝑇𝑂𝑅 𝑀𝐷',charMap:{...makeMap(U,'𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍'),...makeMap(L,'𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧')}},
  4:{name:'Bold Italic',sample:'𝑽𝑬𝑪𝑻𝑶𝑹 𝑴𝑫',charMap:{...makeMap(U,'𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁'),...makeMap(L,'𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛')}},
  5:{name:'Script',sample:'𝒱ℰ𝒞𝒯ℴℛ ℳ𝒟',charMap:{...makeMap(U,'𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵'),...makeMap(L,'𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏')}},
  6:{name:'Bold Script',sample:'𝓥𝓔𝓒𝓣𝓞𝓡 𝓜𝓓',charMap:{...makeMap(U,'𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩'),...makeMap(L,'𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃')}},
  7:{name:'Blackboard',sample:'𝕍𝔼ℂ𝕋𝕆ℝ 𝕄𝔻',charMap:{...makeMap(U,'𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ'),...makeMap(L,'𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫'),...makeMap(D,'𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡')}},
  8:{name:'Fraktur',sample:'𝔙𝔈ℭ𝔗𝔒𝔯 𝔐𝔇',charMap:{...makeMap(U,'𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ'),...makeMap(L,'𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷')}},
  9:{name:'Bold Fraktur',sample:'𝕾𝖚𝖐𝖚𝖓𝖆 𝕸𝕯',charMap:{...makeMap(U,'𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅'),...makeMap(L,'𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟')}},
  10:{name:'Sans Serif',sample:'𝖵𝖤𝖢𝖳𝖮𝖱 𝖬𝖣',charMap:{...makeMap(U,'𝖠𝖡𝖢𝖣𝖤𝖥𝖦𝖧𝖨𝖩𝖪𝖫𝖬𝖭𝖮𝖯𝖰𝖱𝖲𝖳𝖴𝖵𝖶𝖷𝖸𝖹'),...makeMap(L,'𝖺𝖻𝖼𝖽𝖾𝖿𝗀𝗁𝗂𝗃𝗄𝗅𝗆𝗇𝗈𝗉𝗊𝗋𝗌𝗍𝗎𝗏𝗐𝗑𝗒𝗓'),...makeMap(D,'𝟢𝟣𝟤𝟥𝟦𝟧𝟨𝟩𝟪𝟫')}},
  11:{name:'Sans Bold',sample:'𝗩𝗘𝗖𝗧𝗢𝗥 𝗠𝗗',charMap:{...makeMap(U,'𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭'),...makeMap(L,'𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇'),...makeMap(D,'𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵')}},
  12:{name:'Sans Italic',sample:'𝘝𝘌𝘊𝘛𝘖𝘙 𝘔𝘋',charMap:{...makeMap(U,'𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡'),...makeMap(L,'𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻')}},
  13:{name:'Sans Bold Italic',sample:'𝙑𝙀𝘾𝙏𝙊𝙍 𝙈𝘿',charMap:{...makeMap(U,'𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕'),...makeMap(L,'𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯')}},
  14:{name:'Monospace',sample:'𝚅𝙴𝙲𝚃𝙾𝚁 𝙼𝙳',charMap:{...makeMap(U,'𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉'),...makeMap(L,'𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣'),...makeMap(D,'𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿')}},
  15:{name:'Small Caps',sample:'ᴠᴇᴄᴛᴏʀ ᴍᴅ',charMap:{...makeMap(U,'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ'),...makeMap(L,'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ')}},
  16:{name:'Circled',sample:'ⓋⒺⒸⓉⓄⓇ ⓂⒹ',charMap:{...makeMap(U,'ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ'),...makeMap(L,'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ'),...makeMap(D,'⓪①②③④⑤⑥⑦⑧⑨')}},
  17:{name:'Fullwidth',sample:'ＶＥＣＴＯＲ ＭＤ',charMap:{...makeMap(U,'ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ'),...makeMap(L,'ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ'),...makeMap(D,'０１２３４５６７８９')}},
  18:{name:'Upside Down',sample:'ɹOʇɔǝʌ ∩p',charMap:{...makeMap(L,'ɐqɔdǝɟƃɥᴉɾʞlɯuodqɹsʇnʌʍxʎz')}},
  19:{name:'Strikethrough',sample:'V̶E̶C̶T̶O̶R̶ ̶M̶D̶',combiner:'\u0336',charMap:{}},
  20:{name:'Underline',sample:'V̲E̲C̲T̲O̲R̲ ̲M̲D̲',combiner:'\u0332',charMap:{}},
  21:{name:'Double Underline',sample:'V̳E̳C̳T̳O̳R̳ ̳M̳D̳',combiner:'\u0333',charMap:{}},
  22:{name:'Wavy Underline',sample:'V͟E͟C͟T͟O͟R͟ M͟D͟',combiner:'\u035F',charMap:{}},
  23:{name:'Superscript',sample:'ᵛᵉᶜᵗᵒʳ ᵐᵈ',charMap:{...makeMap(L,'ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖqʳˢᵗᵘᵛʷˣʸᶻ'),...makeMap(D,'⁰¹²³⁴⁵⁶⁷⁸⁹')}},
  24:{name:'Subscript',sample:'Vₑcₜₒᵣ Mₐ',charMap:{...makeMap('aehijklmnoprstuvx','ₐₑₕᵢⱼₖₗₘₙₒₚᵣₛₜᵤᵥₓ'),...makeMap(D,'₀₁₂₃₄₅₆₇₈₉')}},
  25:{name:'Wide Bold',sample:'𝗩 𝗘 𝗖 𝗧 𝗢 𝗥',charMap:{...makeMap(U,'𝗔 𝗕 𝗖 𝗗 𝗘 𝗙 𝗚 𝗛 𝗜 𝗝 𝗞 𝗟 𝗠 𝗡 𝗢 𝗣 𝗤 𝗥 𝗦 𝗧 𝗨 𝗩 𝗪 𝗫 𝗬 𝗭'.split(' ').map(c=>c)),...makeMap(L,'𝗮 𝗯 𝗰 𝗱 𝗲 𝗳 𝗴 𝗵 𝗶 𝗷 𝗸 𝗹 𝗺 𝗻 𝗼 𝗽 𝗾 𝗿 𝘀 𝘁 𝘂 𝘃 𝘄 𝘅 𝘆 𝘇'.split(' ').map(c=>c))}},
  26:{name:'Squared',sample:'🅥🅔🅒🅣🅞🅡',charMap:{...makeMap(U,'🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩'),...makeMap(L,'🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩')}},
  27:{name:'Negative Circled',sample:'🅥🅔🅒🅣🅞🅡',charMap:{...makeMap(U,'🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩'),...makeMap(L,'🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩')}},
  28:{name:'Ancient/Runic',sample:'ᚢᛖᚲᛏᛟᚱ',charMap:{...makeMap(U,'ᚨᛒᚲᛞᛖᚠᚷᚺᛁᛃᚲᛚᛗᚾᛟᛈᚷᚱᛊᛏᚢᚢᚹᛪᛃᛉ'),...makeMap(L,'ᚨᛒᚲᛞᛖᚠᚷᚺᛁᛃᚲᛚᛗᚾᛟᛈᚷᚱᛊᛏᚢᚢᚹᛪᛃᛉ')}},
  29:{name:'Bubble',sample:'ᵛᵉᶜᵗᵒʳ ᵐᵈ (bubble)',charMap:{...makeMap(U,'ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ'),...makeMap(L,'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ')}},
  30:{name:'Old English',sample:'𝔙𝔢𝔠𝔱𝔬𝔯',charMap:{...makeMap(U,'𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ'),...makeMap(L,'𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷')}},
}

class FontSystem {
  convert(text, n=1) {
    const font = FONTS[n]; if(!font||n===1) return text
    if(font.combiner) { let r=''; for(const c of text){r+=c;if(c!==' '&&c!=='\n')r+=font.combiner}; return r }
    let r=''; for(const c of text) r+=(font.charMap[c]??c); return r
  }
  getFontList() { return Object.entries(FONTS).map(([id,f])=>({id:+id,name:f.name,sample:f.sample})) }
  getFontName(n) { return FONTS[n]?.name??'Unknown' }
  isValidFont(n) { return !!FONTS[n] }
  get maxFont() { return 30 }
  // Wrap sock.sendMessage once so every text/caption is auto-converted with the current font
  ensureFontPatch(sock) {
    if (!sock || sock._fontPatched) return
    const orig = sock.sendMessage.bind(sock)
    sock.sendMessage = async (jid2, content, opts) => {
      const fn = global.currentFont || 1
      if (fn > 1 && content && typeof content === "object") {
        if (content.text && typeof content.text === "string") {
          content = { ...content, text: this.convert(content.text, fn) }
        }
        if (content.caption && typeof content.caption === "string") {
          content = { ...content, caption: this.convert(content.caption, fn) }
        }
      }
      return orig(jid2, content, opts)
    }
    sock._fontPatched = true
  }
}
module.exports = new FontSystem()
