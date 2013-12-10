var _ = require('underscore');

var exchanger = {
    mtgox: {
        currency: '$',
        site: 'https://mtgox.com/',
        url: 'http://www.btc123.com/e/interfaces/tickers.php?type=MtGoxTicker&suffix=0.8636577818542719'
    },
    bitstamp: {
        currency: '$',
        site: 'https://www.bitstamp.net/',
        url: 'https://www.bitstamp.net/api/ticker'
    },
    btce: {
        currency: '$',
        site: 'https://btc-e.com/',
        url: 'https://btc-e.com/api/2/btc_usd/ticker'
    },
    futures796: {
        currency: '$',
        site: 'http://bitcoinwisdom.com/markets/796/futures',
        url: 'http://www.btc123.com/e/interfaces/tickers.php?type=796futuresTicker&suffix=0.38433733163401484'
    },
    coinbase: {
        currency: '$',
        site: 'https://coinbase.com/',
        url: 'https://coinbase.com/api/v1/prices/spot_rate'
    },
    btcchina: {
        currency: '¥',
        site: 'https://www.btcchina.com/',
        url: 'http://www.btc123.com/e/interfaces/tickers.php?type=btcchinaTicker&suffix=0.3849131213501096'
    },
    okcoin: {
        currency: '¥',
        site: 'https://www.okcoin.com/',
        url: 'http://www.btc123.com/e/interfaces/tickers.php?type=okcoinTicker&suffix=0.7636065774131566'
    },
    chbtc: {
        currency: '¥',
        site: 'https://www.chbtc.com/',
        url: 'http://www.btc123.com/e/interfaces/tickers.php?type=chbtcTicker&suffix=0.5108873315621167'
    },
    fxbtc: {
        currency: '¥',
        site: 'http://www.fxbtc.com/',
        url: 'http://www.btc123.com/e/interfaces/tickers.php?type=fxbtcTicker&suffix=0.19148686854168773'
    },
    btctrade: {
        currency: '¥',
        site: 'http://www.btctrade.com/',
        url: 'http://www.btc123.com/e/interfaces/tickers.php?type=btctradeTicker&suffix=0.1531917753163725'
    },
    btc100: {
        currency: '¥',
        site: 'https://btc100.org/',
        url: 'http://www.btc123.com/e/interfaces/tickers.php?type=btc100Ticker&suffix=0.16103304247371852'
    }
};

exports.list = function() {
    return _.map(exchanger, function(v,k){
        v.name = k;
        return v;
    });
}

exports.map = exchanger;
