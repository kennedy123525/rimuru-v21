// RIMURU adapter shim for the VECTOR MD ../config require inside pack commands.
// Maps the fields pack commands expect onto Rimuru's config.
const config = require('../config')

module.exports = {
  botName: 'RIMURU',
  ownerName: (config.owner && config.owner.name) || 'Owner',
  ownerNumber: (config.owner && config.owner.ids && String(config.owner.ids[0] || '')) || '',
  prefix: config.prefix || '.',
  telegramToken: '',
}
