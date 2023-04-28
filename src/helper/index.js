const request = require('./request')
const logger = require('./logger')
const date = require('./date')
const incrementAmount = require('./global')

module.exports = {
  ...request,
  ...logger,
  ...date,
  ...incrementAmount
}
