# Rimuru — WhatsApp chatbot (v2.1)

Node.js + Express + Baileys (unofficial WhatsApp Web library). AI: Groq -> DeepSeek -> Gemini fallback.
Baileys breaks Meta's terms: use a spare number, never your main one. Messages sent from the
linked account itself are ignored, so use a SEPARATE number for Rimuru.

## v2.1 — clean structure + Rimuru Tempest persona (by CHAD FDEV / VECTOR-MD)
- **Restructured**: every helper module (`nick.js`, `menu.js`, `time.js`, `settings.js`, `personality.js`,
  `connection.js`, AI providers, downloader, textmaker, fonts, etc.) now lives in the **`lib/`** folder.
  The root only keeps the four entry files: `server.js` (start), `index.js` (command registry),
  `messageHandler.js` (dispatcher), `config.js` (settings) — same layout as VECTOR-MD.
- **Economy category removed**: all 22 `.work / .rob / .gamble / .shop...` commands and their engine
  are gone. Nothing replaced them — Rimuru is not an economy bot.
- **The AI is Rimuru Tempest**: the slime himself — friendly, playful, helpful, a light anime flavor
  (Great Sage, Tempest, the crew — sprinkled, never forced). No "how can I help you today" bot talk.
  He still answers properly like an AI: math, explanations, advice.
- Credits split: **CHAD FDEV • VECTOR-MD** is the dev ("who built you?" -> CHAD FDEV);
  Kennedy stays the owner Rimuru is loyal to.

## v2.0 — restructured command system (by CHAD FDEV / VECTOR-MD)
- All command modules now live in the **`COMMANDS/`** folder. The bot scans that folder on every
  start — drop a `.js` file there that exports an array of commands and Rimuru picks it up.
- Upgraded from 37 to **500+ commands** with the VECTOR-MD command pack (APIs by CHAD FDEV):
  fonts, textmakers, AI, downloads, games, cyber and more.
- `.play` now sends FULL songs (was a 30-second preview). `.vv` / `.vv2` are now registered.
- New menus: `.menu` (capped overview), `.cmds <category>`, `.allmenu` (full dump).
- Credits: structure & command pack by **CHAD FDEV • VECTOR-MD**. Bot: Rimuru.

## Install note (panels that block git)
Some panels block npm from fetching git packages (error EALLOWGIT). `package.json` has an
`overrides` entry that swaps Baileys' git dependency for the npm-published copy, so plain
`npm install` works. Delete any old `node_modules` and `package-lock.json` before starting.

## Folder layout
```
server.js  index.js  messageHandler.js  config.js   <- root: only the 4 entry files
lib/       <- every helper module (settings, personality, AI providers, connection,
              nick, menu, time, ffmpeg, downloader, textmaker, fonts, auth, ...)
COMMANDS/  <- all commands (the bot loads them from here)
COMMANDS/vectorpack/   <- the VECTOR-MD pack, bridged by vector_adapter.js
```

## Setup (Spaceify / Pterodactyl-style panel)
1. Files: upload the zip to /home/container and Unarchive (this keeps your `.env`, `auth`, `data`).
2. Startup tab: JS FILE = `server.js`.
3. Create `.env` (see `.env.example`). Minimum: GROQ_API_KEY and/or GEMINI_API_KEY, PAIRING_NUMBER,
   CLAIM_PASSPHRASE.
4. Console > Start. First start installs packages (a few minutes).
5. On Rimuru's phone: WhatsApp > Linked Devices > Link a Device > Link with phone number, enter
   the `PAIRING CODE` printed in the console.

## Pairing problems
Watch the Console after pressing Start. Rimuru now prints what he is doing:
- `Linking number 234******78 (13 digits)`: the number he read from PAIRING_NUMBER. If this is empty or wrong, fix `.env`.
- `PAIRING CODE: XXXX-XXXX`: type it in WhatsApp (Settings > Linked Devices > Link a Device > Link with phone number
  instead) on the phone that owns that number. Open that screen BEFORE you press Start. The code lasts about a minute.
- `Connection closed. Code 405`: WhatsApp refused the connection (old library, or a blocked server address).
- `Code 428` / `408`: the connection dropped; Rimuru retries by himself.
- `Asked for 3 pairing codes already`: he stopped on purpose. Wait ~30 minutes, then press Start once. Many restarts in a
  row can make WhatsApp refuse new codes for a while.
Tips: number = digits only with country code (no +, no spaces, no leading 0); use a normal WhatsApp or WhatsApp Business
account; keep WhatsApp updated; if a login is stuck, stop Rimuru, delete the `auth` folder, start once. Some hosting
addresses (data centres) are treated with suspicion by WhatsApp; if every attempt fails with the same code, that may be why.

## Owner and Kennedy
Send `.claim <CLAIM_PASSPHRASE>` to Rimuru in a PRIVATE chat. He stores your phone number and your
hidden WhatsApp id (LID), so tags in groups are recognised. `.unclaim` (owner) clears claims.
Once he has seen the owner in a group he also learns the hidden id automatically.

## Commands
General: menu help ping about status owner · AI: chatbot on/off (ai on/off works too), clear, protect on/off (owner)
Sticker: s take toimg · Media: play · Profile: getpp @user · Group (admins): add <number>, kick @user
Utility: afk [reason] · Owner: addsubowner/delsubowner, setprefix <symbol|reset>, setprofilepic (reply to an image),
  d <time> (reply to a message: deletes it after e.g. 5s / 2m / 1h), sleep / wake (or "rimuru sleep" / "rimuru wake up")
Hidden: claim, unclaim
Download: dl <link> [audio] · Media: tomp3 (reply to a video / voice note)
Group: hidetag [text] (admins; tags everyone silently, works on a replied message/media), recap [count] (AI summary of recent group chat)
Affinity: affinity [@user], resetaffinity @user | all (owner; "all" = main owner only; alias affinityreset)
Games: rps, dice, flip, 8ball, slots, guess, math, ttt @user, hangman, top

## dl, recap, affinity: how they work
- `dl`: TikTok links work with no setup (TikWM). Direct file links (.mp4 .mp3 .jpg ...) work too. YouTube / Instagram /
  Twitter / Facebook / etc. need a cobalt server: set `COBALT_API_URL` (and `COBALT_API_KEY` if it wants one) in `.env`.
  `DL_MAX_MB` (default 60) caps the file size. Links to private/internal addresses are refused.
- `recap`: reads the last messages Rimuru saw in the group. They are kept in memory only (never saved), so a restart empties them.
- Affinity: +1 per AI conversation (max once per 30 s per person). Levels: stranger, tolerated (10), familiar (40), trusted (100),
  favorite (200). Familiar and above makes him a little less sharp with that person. Owners are not affected.
- Games keep their state in memory (a restart ends running games); wins are saved for `top`.

## Owners: no prefix needed
Owners and sub-owners can skip the prefix: `ping`, `menu`, `afk lunch`, `kick @user`, `add 2348012345678`,
`d 5s` (reply), `s` (reply to an image), `chatbot off`, `setprefix !` ... In groups plain words like `ping` need his name
(`Rimuru ping`); commands with a real target (`kick @user`) work as they are. Everyone else must use the prefix.
Owners also get a kind Rimuru: no insults. Everyone else gets the playful sass.

## Personality — Rimuru Tempest
The AI talks like the anime character: friendly, confident, a little cheeky, actually helpful —
never a generic assistant (no "how can I help you today"). `PERSONALITY=savage` (default: adds
playful teasing and short comebacks) or `PERSONALITY=calm` (mellowed Tempest).

## Speed for the owner and Kennedy
- When someone @tags Kennedy in a group, Rimuru answers first, before AFK checks and commands, and sends the
  reaction and the reply together. The group cooldown is now 5 s (`PROTECTED_COOLDOWN_MS`, was 30 s).
- Owners are never rate-limited in AI chat, and the "typing" indicator no longer delays the AI call.
- Rimuru answers to "rimuru" or "rimuru" (e.g. `rimuru ping`, `rimuru wake up`).

## Notes
- Reasoning models (e.g. GROQ_MODEL=openai/gpt-oss-20b) can leak their thinking; Rimuru strips it, but `llama-3.3-70b-versatile` is the safe choice.
- If you forget a custom prefix: `.setprefix reset`, `.claim` and `.wake` always answer to the default `.`

## Optional extras (more disk needed)
Video stickers and animated .toimg need `wa-sticker-formatter` and `ffmpeg-static`
(in the panel's "Additional Node packages" box, or `npm install` them). Without them Rimuru
still makes image stickers (no pack name/author) and says clearly what he can't do.
For Render-style hosts with no disk, also install `pg` and set DATABASE_URL.

## Tests
`npm test` runs offline tests (fallback chain, memory, Kennedy, claim, prefix, AFK, kick, menu).
Everything that needs real WhatsApp, API keys or media must be tested on your server.
