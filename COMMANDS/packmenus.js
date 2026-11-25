// RIMURU v2 — pack menus: .cmds <category> lists one category fully,
// .allmenu dumps every command (chunked). Added by CHAD FDEV / VECTOR-MD.
const settings = require('../lib/settings');

function chunked(ctx, chunks) {
  (async () => {
    for (const c of chunks) {
      await ctx.reply(c);
      await new Promise((r) => setTimeout(r, 700));
    }
  })().catch(() => {});
}

module.exports = [
  {
    name: 'allmenu', category: 'VECTOR PACK', menu: ['allmenu'],
    aliases: ['fullmenu', 'menuall'],
    run: (ctx) => {
      const prefix = settings.prefix();
      const groups = new Map();
      for (const c of ctx.commandList || []) {
        if (c.hidden) continue;
        const cat = c.category || 'OTHER';
        if (!groups.has(cat)) groups.set(cat, []);
        for (const e of c.menu || [c.name]) if (!groups.get(cat).includes(e)) groups.get(cat).push(e);
      }
      const cats = [...groups.keys()].sort();
      let first = true;
      let i = 0;
      for (const cat of cats) {
        const lines = [];
        if (first) {
          lines.push('╭━━━「 RIMURU • ALL COMMANDS 」');
          lines.push(`┃ Total: ${(ctx.commandList || []).length}+ callable`);
          lines.push('┃ Credits: CHAD FDEV • VECTOR-MD');
          lines.push('┃');
          first = false;
        }
        lines.push(`┣━━━「 ${cat} (${groups.get(cat).length}) 」`);
        for (const e of groups.get(cat)) lines.push(`┃ ◈ ${prefix}${e}`);
        lines.push('╰━━━━━━━━━━━━');
        const text = lines.join('\n');
        // send each category as its own message (WhatsApp-safe size)
        setTimeout(() => ctx.reply(text).catch(() => {}), i * 900);
        i++;
      }
    },
  },

  {
    name: 'cmds', category: 'VECTOR PACK', menu: ['cmds'],
    run: (ctx) => {
      const prefix = settings.prefix();
      const query = (ctx.argText || '').trim().toLowerCase();
      const groups = new Map();
      for (const c of ctx.commandList || []) {
        if (c.hidden) continue;
        const cat = c.category || 'OTHER';
        if (!groups.has(cat)) groups.set(cat, []);
        for (const e of c.menu || [c.name]) if (!groups.get(cat).includes(e)) groups.get(cat).push(e);
      }
      const cats = [...groups.keys()].sort();
      if (!query) {
        const lines = ['╭━━━「 RIMURU • CATEGORIES 」', '┃'];
        for (const cat of cats) lines.push(`┃ ◈ ${prefix}cmds ${cat.toLowerCase().split(' ')[0]} → ${cat} (${groups.get(cat).length})`);
        lines.push('╰━━━━━━━━━━━━', '', 'Pick a category.');
        return ctx.reply(lines.join('\n'));
      }
      const hit = cats.find((c) => c.toLowerCase().split(' ')[0] === query || c.toLowerCase() === query);
      if (!hit) return ctx.reply(`No category called "${query}". Send ${prefix}cmds for the list.`);
      const names = groups.get(hit);
      const lines = [`╭━━━「 ${hit} — ${names.length} commands 」`, '┃ Credits: CHAD FDEV • VECTOR-MD', '┃'];
      for (const e of names) lines.push(`┃ ◈ ${prefix}${e}`);
      lines.push('╰━━━━━━━━━━━━');
      return ctx.reply(lines.join('\n'));
    },
  },
];
