module.exports = {
  name: "colorpicker",
  async execute(sock, msg, args) {
    const hex = args[0]?.replace("#","")
    if (!hex || !/^[0-9A-Fa-f]{6}$/.test(hex)) return sock.sendMessage(msg.key.remoteJid, { text: "Usage: .colorpicker <hex>\nExample: .colorpicker FF5733" })
    const r = parseInt(hex.slice(0,2),16)
    const g = parseInt(hex.slice(2,4),16)
    const b = parseInt(hex.slice(4,6),16)
    const hsl = rgbToHsl(r,g,b)
    function rgbToHsl(r,g,b){r/=255;g/=255;b/=255;const max=Math.max(r,g,b),min=Math.min(r,g,b);let h,s,l=(max+min)/2;if(max===min){h=s=0}else{const d=max-min;s=l>0.5?d/(2-max-min):d/(max+min);switch(max){case r:h=(g-b)/d+(g<b?6:0);break;case g:h=(b-r)/d+2;break;case b:h=(r-g)/d+4;}h/=6}return[Math.round(h*360),Math.round(s*100),Math.round(l*100)]}
    sock.sendMessage(msg.key.remoteJid, { text: `🎨 *Color Info: #${hex.toUpperCase()}*\n\nRGB: rgb(${r}, ${g}, ${b})\nHSL: hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)\n\n🔗 https://www.colorhexa.com/${hex}` })
  }
}
