var sdk = require('sdk'),
    exchangers = require('./exchangers');

module.exports = new sdk(exchangers.map, {
    server: ''
});