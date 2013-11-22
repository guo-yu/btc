var async = require('async'),
    sdk = require('./sdk'),
    exchangers = require('./exchangers');

exports.prices = function(callback) {
    var results = {};
    var fetch = function(target, cb) {
        if (sdk[target.name]) {
            sdk[target.name]({}, function(err, result) {
                if (!err) {
                    results[target.name] = [];
                    if (result.stat == 200) results[target.name].push(result.body);
                    cb(null);
                } else {
                    cb(err);
                }
            });
        } else {
            cb(null);
        }
    };
    async.each(exchangers.list(), fetch, function(err) {
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
            callback(new Error('exchangers not found'))
        }
    } else {
        exports.prices(callback);
    }
}
