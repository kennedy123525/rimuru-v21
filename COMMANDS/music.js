// .play — FULL SONG downloader (VECTOR MD APIs by CHAD FDEV).
// iTunes is only used as a fallback preview if every download API fails.
const config = require('../config');
const { request } = require('../lib/http');
const dl = require('../lib/downloader');

module.exports = [
  {
    name: 'play', category: 'MEDIA', menu: ['play'],
    aliases: ['song', 'music'],
    run: async (ctx) => {
      const q = ctx.argText;
      if (!q) return ctx.reply('Tell me what to look for. Example: .play artist - song');

      await ctx.reply(`🔍 Searching: *${q}*...`);

      // ── Full song via the VECTOR MD downloader (CHAD FDEV) ──
      try {
        const audio = await dl.ytAudio(q);
        if (audio && audio.buffer && audio.buffer.length > 10000) {
          const clean = String(audio.title || q).replace(/[^\w\s\-]/g, '').trim().slice(0, 60) || q;
          await ctx.sock.sendMessage(ctx.jid, {
            audio: audio.buffer, mimetype: audio.mimetype, ptt: false,
            fileName: clean + '.' + audio.ext,
          }, { quoted: ctx.msg });
          await ctx.reply(`✅ *${audio.title || q}*\n🎵 Enjoy!\n\n_Powered by VECTOR MD • CHAD FDEV_`);
          return;
        }
      } catch (e) {
        // fall through to the iTunes preview
      }

      // ── Fallback: iTunes 30s preview ──
      const url = `https://itunes.apple.com/search?term=${encodeURIComponent(q)}&media=music&entity=song&limit=1&country=${config.music.country}`;
      const data = await request(url, { timeoutMs: 15000 });
      const t = data?.results?.[0];
      if (!t) return ctx.reply("I couldn't find that one. Try 'artist - song'.");

      const yt = `https://www.youtube.com/results?search_query=${encodeURIComponent(`${t.artistName} ${t.trackName}`)}`;
      const caption =
        `*${t.trackName}*\n${t.artistName}${t.collectionName ? `\nAlbum: ${t.collectionName}` : ''}\n\n` +
        `Listen: ${t.trackViewUrl}\nSearch on YouTube: ${yt}\n\n` +
        (t.previewUrl ? '(Download APIs failed — sending a 30-second preview. Full song at the links.)' : '(No preview available. Use the links.)');

      if (t.artworkUrl100) {
        try {
          const img = await request(t.artworkUrl100.replace('100x100', '600x600'), { as: 'buffer', timeoutMs: 15000 });
          await ctx.sock.sendMessage(ctx.jid, { image: img, caption }, { quoted: ctx.msg });
        } catch (_) { await ctx.reply(caption); }
      } else {
        await ctx.reply(caption);
      }

      if (t.previewUrl) {
        try {
          const audio = await request(t.previewUrl, { as: 'buffer', timeoutMs: 20000 });
          await ctx.sock.sendMessage(ctx.jid, { audio, mimetype: 'audio/mp4', ptt: false }, { quoted: ctx.msg });
        } catch (_) { await ctx.reply("The preview wouldn't load, but the links above work."); }
      }
    },
  },
];
