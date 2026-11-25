
const config = require('../config');
const { buildMenu } = require('../lib/menu');
const fallback = require('../lib/fallback');
const settings = require('../lib/settings');
const memory = require('../lib/memory');
const { state } = require('../lib/connection');
const path = require('path');
const fs = require('fs');

const MENU_IMAGE = path.join(__dirname, '../rimuru-menu.webp');

const sendMenu = async (ctx) => {
  const caption = buildMenu(ctx.commandList);

  if (fs.existsSync(MENU_IMAGE)) {
    await ctx.sock.sendMessage(ctx.jid, {
      image: fs.readFileSync(MENU_IMAGE),
      caption,
    }, { quoted: ctx.msg });
  } else {
    await ctx.reply(caption);
  }
};

function fmtUptime(sec) {
  const d = Math.floor(sec / 86400), h = Math.floor((sec % 86400) / 3600), m = Math.floor((sec % 3600) / 60);
  return `${d ? d + 'd ' : ''}${h}h ${m}m ${sec % 60}s`;
}

module.exports = [
  { name: 'menu', category: 'GENERAL', menu: ['menu'], run: sendMenu },
  { name: 'help', category: 'GENERAL', menu: ['help'], run: sendMenu },

  {
    name: 'ping', category: 'GENERAL', menu: ['ping'],
    run: async (ctx) => {
      // WhatsApp timestamps have 1-second precision, so treat this as approximate.
      const sent = Number(ctx.msg.messageTimestamp) * 1000;
      const ms = Math.max(0, Date.now() - sent);
      await ctx.reply(`Online. ${ms} ms.`);
    },
  },

  {
    name: 'about', category: 'GENERAL', menu: ['about'],
    run: (ctx) => ctx.reply(
      `*Rimuru* v${config.version}\n` +
      `Laid-back, sharp-tongued, a little sarcastic. Always has the back of ${config.owner.name}.\n\n` +
      `Prefix: ${settings.prefix()}\n` +
      `Memory: last ${config.memory.limit} messages per person\n` +
      `AI: ${fallback.status().filter((p) => p.configured).map((p) => p.name).join(' > ') || 'none configured'}\n\n` +
      `Type ${settings.prefix()}menu to see what I can do.`,
      '',
      '⚡ Restructured & upgraded by *CHAD FDEV • VECTOR-MD*'
    ),
  },

  {
    name: 'status', category: 'GENERAL', menu: ['status'],
    run: (ctx) => {
      const ai = fallback.status().map((p) =>
        `  ${p.name}: ${!p.configured ? 'not configured' : p.cooling ? `cooling (${p.cooldownSec}s)` : 'ready'}`).join('\n');
      return ctx.reply(
        `*Status*\n` +
        `Uptime: ${fmtUptime(Math.floor(process.uptime()))}\n` +
        `WhatsApp: ${state.status}\n` +
        `AI in this chat: ${settings.isAiOn(ctx.jid) ? 'on' : 'off'}\n` +
        `Providers:\n${ai}\n` +
        `Kennedy protection: ${settings.isProtectOn() && config.protectedContact.ids.length ? 'on' : 'off'}\n` +
        `People remembered: ${memory.stats().users}`
      );
    },
  },

  {
    name: 'owner', category: 'GENERAL', menu: ['owner'],
    run: (ctx) => {
      let t = `Owner: ${config.owner.name}`;
      if (config.owner.showNumber && config.owner.ids[0]) t += `\nhttps://wa.me/${config.owner.ids[0]}`;
      return ctx.reply(t);
    },
  },
];
