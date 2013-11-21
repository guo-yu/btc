var sdk = require('sdk');

module.exports = new sdk({
    btcchina: {
        url: 'https://data.btcchina.com/data/chart/interval/86400/duration/2592000'
    },
    bitstamp: {
        url: 'https://www.bitstamp.net/api/ticker'
    }
},{
    server: ''
});