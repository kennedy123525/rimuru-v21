module.exports = {
  name: "flirt",
  async execute(sock, msg, args) {
    const lines = ["Are you a magician? Because whenever I look at you, everyone else disappears.","Do you have a map? I keep getting lost in your eyes.","Are you Wi-Fi? Because I'm feeling a connection.","You must be a keyboard, because you're just my type.","Is your name Google? Because you have everything I've been searching for.","Are you a camera? Every time I look at you, I smile.","If you were a vegetable, you'd be a cute-cumber 🥒","Are you a parking ticket? Because you've got FINE written all over you."]
    const target = args.join(" ") || "you"
    sock.sendMessage(msg.key.remoteJid, {text:`💘 *Flirt for ${target}*\n\n${lines[Math.floor(Math.random()*lines.length)]}`})
  }
}