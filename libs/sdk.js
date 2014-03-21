var Sdk = require('sdk');
var exchangers = require('./exchangers');

module.exports = sdk()

function sdk() {
  var settings = {}
  settings.server = ''
  return new Sdk(exchangers.map, settings)
}