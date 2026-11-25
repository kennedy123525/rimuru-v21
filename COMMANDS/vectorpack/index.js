const create = require("./baseAnime")

const commands = [
  "waifu","neko","shinobu","megumin","bully","cuddle","cry","hug","awoo",
  "kiss","lick","pat","smug","bonk","yeet","blush","wave","highfive"
]

module.exports = commands.map(cmd =>
  create(cmd, cmd)
)