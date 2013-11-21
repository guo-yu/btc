var sdk = require('./sdk'),
    async = require('async'),
    _ = require('underscore');

var urlMap = {
    btcchina: 'https://www.btcchina.com/',
    bitstamp: 'https://www.bitstamp.net/',
    okcoin: 'https://www.okcoin.com/',
    fxbtc: 'http://www.fxbtc.com/',
    btctrade: 'http://www.btctrade.com/',
    mtgox: 'https://mtgox.com/',
    chbtc: 'https://www.chbtc.com/',
    futures796: 'http://bitcoinwisdom.com/markets/796/futures',
    btc100: 'https://btc100.org/'
};

exports.exchangers = function(sdk) {
    var list = [];
    _.each(sdk, function(value, k) {
        if (k !== 'router' && k !== 'parent') {
            list.push({
                name: k,
                url: urlMap[k]
            });
        }
    });
    return list;
}

exports.prices = function(callback) {
    var results = {};
    var fetch = function(target, cb) {
        if (sdk[target.name]) {
            sdk[target.name]({}, function(err, result) {
                if (!err) {
                    results[target.name] = [];
                    if (result.stat == 200) results[target.name].push(result.body);
                    cb(null)
                } else {
                    cb(err);
                }
            })
        } else {
            cb(null);
        }
    };
    async.each(exports.exchangers(sdk), fetch, function(err) {
        callback(err, results);
    });
}

exports.price = function(target, callback) {
    var callback = (typeof(target) == 'function' && !callback) ? target : callback,
        target = (target && typeof(target) == 'string') ? target : null;
    if (target) {
        if (sdk[target]) {
            sdk[target]({}, function(err, result) {
                if (!err) {
                    callback(null, result.body);
                } else {
                    callback(err);
                }
            })
        } else {
            callback(new Error('target not found'))
        }
    } else {
        exports.prices(callback);
    }
}