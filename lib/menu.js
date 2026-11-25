// Builds the menu automatically from the registered commands.
// With 400+ commands the menu is capped per category (".cmds <category>" via
// the vector pack shows everything — or .allmenu for the full dump).
const settings = require('./settings');
const { label } = require('./personality');

const ORDER = ['GENERAL', 'AI SYSTEM', 'STICKER TOOLS', 'MEDIA', 'DOWNLOAD', 'PROFILE', 'GROUP TOOLS', 'GAMES', 'UTILITY', 'OWNER'];
const PER_CAT_CAP = 14;
const TOTAL_CAP = 150;

function buildMenu(commands) {
  const prefix = settings.prefix();
  const groups = new Map();
  const total = new Map();
  for (const c of commands) {
    if (c.hidden) continue;
    const cat = c.category || 'OTHER';
    if (!groups.has(cat)) { groups.set(cat, []); total.set(cat, new Set()); }
    const seen = total.get(cat);
    for (const entry of c.menu || [c.name]) if (!seen.has(entry)) { seen.add(entry); groups.get(cat).push(entry); }
  }
  const cats = [...ORDER.filter((c) => groups.has(c)), ...[...groups.keys()].filter((c) => !ORDER.includes(c))];

  const lines = ['╭━━━「 R I M U R U 」', '┃', '┃ Status: Online', `┃ Personality: ${label()}`, `┃ Commands: ${[...total.values()].reduce((a, s) => a + s.size, 0)}`, '┃'];
  let shown = 0;
  for (const cat of cats) {
    if (shown > TOTAL_CAP) { lines.push(`┣━━━「 … more 」`, `┃ ◈ ${prefix}allmenu for every command`, '┃'); break; }
    const all = groups.get(cat);
    const cap = Math.min(all.length, shown === 0 ? PER_CAT_CAP + 4 : PER_CAT_CAP);
    lines.push(`┣━━━「 ${cat} 」`);
    for (const e of all.slice(0, cap)) { lines.push(`┃ ◈ ${prefix}${e}`); shown++; }
    if (all.length > cap) lines.push(`┃ … +${all.length - cap} more (${prefix}cmds ${cat.toLowerCase().split(' ')[0]})`);
    lines.push('┃');
  }
  lines.push('╰━━━━━━━━━━━━', '', 'Choose a command. I suppose.', '', '⚡ Structure & command pack by *CHAD FDEV • VECTOR-MD*');
  return lines.join('\n');
}

module.exports = { buildMenu };
