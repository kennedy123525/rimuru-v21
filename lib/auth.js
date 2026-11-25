// RIMURU adapter shim for VECTOR MD lib/auth.
// Rimuru handles his own access control in ctx (isOwner etc.), so:
//  - isPaired() is always true here (pack commands only run through the registry)
//  - isOwner() maps to Rimuru's owner ids from config
const config = require('../config')

function getNum(jid) {
  return String(jid || '').replace(/[^0-9]/g, '').split('@')[0]
}

function isPaired() { return true }

function isOwner(jid) {
  const n = getNum(jid)
  if (!n) return false
  const ids = (config.owner && config.owner.ids) || []
  if (ids.map(String).includes(n)) return true
  const pn = config.pairingNumber ? getNum(config.pairingNumber) : ''
  return Boolean(pn) && pn === n
}

module.exports = { isPaired, isOwner, getNum }
