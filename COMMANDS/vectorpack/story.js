module.exports = {
  name: "story",
  async execute(sock, msg, args) {
    const topic = args.join(" ") || "adventure"
    const stories = [
      `Once upon a time, in a world of *${topic}*, a brave hero set out on a journey no one had attempted before. They met a wise elder who said: _"The greatest adventure is the one that changes you from within."_ The hero returned not with gold, but with wisdom. 🌟`,
      `In the realm of *${topic}*, a young dreamer was told their ideas were impossible. But one day, with determination and courage, they proved everyone wrong. Sometimes impossible just needs the right person. ✨`,
      `A mysterious letter arrived bearing only the words: *"${topic}"* — no sender, no explanation. Just a clue that sent our hero on the greatest journey of their life... 🔮`
    ]
    sock.sendMessage(msg.key.remoteJid, {text:`📖 *Mini Story: ${topic}*\n\n${stories[Math.floor(Math.random()*stories.length)]}`})
  }
}