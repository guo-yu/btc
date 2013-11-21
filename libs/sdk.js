var sdk = require('sdk');

module.exports = new sdk({
    mtgox: {
        url: 'http://www.btc123.com/e/interfaces/tickers.php?type=MtGoxTicker&suffix=0.8636577818542719'
    },
    bitstamp: {
        url: 'https://www.bitstamp.net/api/ticker'
    },
    futures796: {
        url: 'http://www.btc123.com/e/interfaces/tickers.php?type=796futuresTicker&suffix=0.38433733163401484'
    },
    btcchina: {
        url: 'http://www.btc123.com/e/interfaces/tickers.php?type=btcchinaTicker&suffix=0.3849131213501096'
    },
    okcoin: {
        url: 'http://www.btc123.com/e/interfaces/tickers.php?type=okcoinTicker&suffix=0.7636065774131566'
    },
    chbtc: {
        url: 'http://www.btc123.com/e/interfaces/tickers.php?type=chbtcTicker&suffix=0.5108873315621167'
    },
    fxbtc: {
        url: 'http://www.btc123.com/e/interfaces/tickers.php?type=fxbtcTicker&suffix=0.19148686854168773'
    },
    btctrade: {
        url: 'http://www.btc123.com/e/interfaces/tickers.php?type=btctradeTicker&suffix=0.1531917753163725'
    },
    btc100: {
        url: 'http://www.btc123.com/e/interfaces/tickers.php?type=btc100Ticker&suffix=0.16103304247371852'
    }
},{
    server: ''
});