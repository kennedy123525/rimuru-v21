module.exports = {
  name: "bmi",
  async execute(sock, msg, args) {
    if (args.length < 2) return sock.sendMessage(msg.key.remoteJid, { text: "Usage: .bmi <weight_kg> <height_cm>\nExample: .bmi 70 175" })
    const weight = parseFloat(args[0])
    const height = parseFloat(args[1]) / 100
    if (isNaN(weight) || isNaN(height) || height <= 0) return sock.sendMessage(msg.key.remoteJid, { text: "❌ Invalid values." })
    const bmi = (weight / (height * height)).toFixed(1)
    const cat = bmi < 18.5 ? "Underweight 🟡" : bmi < 25 ? "Normal weight 🟢" : bmi < 30 ? "Overweight 🟠" : "Obese 🔴"
    sock.sendMessage(msg.key.remoteJid, { text: `⚖️ *BMI Calculator*\n\nWeight: ${weight}kg | Height: ${args[1]}cm\n\nBMI: *${bmi}*\nCategory: *${cat}*` })
  }
}
