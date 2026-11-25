module.exports = {
  name: "compliment",
  async execute(sock, msg, args) {
    const c = ["You make the world a better place just by being in it! 🌟","Your smile could light up an entire room! ✨","You have the best energy around you! 😄","You're incredibly thoughtful and kind! 💝","The world is better because of the positivity you bring! ☀️","Your creativity and passion are truly inspiring! 🎨","You handle challenges with such grace! 💪","You're one of a kind and that makes you truly special! 🌈"]
    const target = args.join(" ") || "you"
    sock.sendMessage(msg.key.remoteJid, {text:`💐 *Compliment for ${target}*\n\n${c[Math.floor(Math.random()*c.length)]}`})
  }
}