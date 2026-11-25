module.exports = {
  name: "poll",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid
    const input = args.join(" ").split("|")
    if (input.length < 3) return sock.sendMessage(jid, {text:"Usage: .poll Question | Option1 | Option2 | Option3\nExample: .poll Fav color? | Red | Blue | Green"})
    const question = input[0].trim()
    const options = input.slice(1).map(o=>o.trim())
    const optText = options.map((o,i)=>`${["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣"][i]||`${i+1}.`} ${o}`).join("\n")
    sock.sendMessage(jid, {text:`📊 *Poll*\n\n*${question}*\n\n${optText}\n\nReact or reply with your choice!`})
  }
}