var async = require('async');
var sdk = require('./sdk');
var exchangers = require('./exchangers');

exports.prices = prices;
exports.price = price;

function prices(callback) {
  var results = {};
  var fetch = function(target, cb) {
    if (!sdk[target.name]) return cb(null)
    sdk[target.name]({}, function(err, result) {
      if (err) return cb(err)
      results[target.name] = [];
      if (result.stat == 200) results[target.name].push(result.body);
      cb(null);
    });
  };
  async.each(exchangers.list, fetch, function(err) {
    callback(err, results);
  });
}

function price(target, callback) {
  var callback = (typeof(target) == 'function' && !callback) ? target : callback;
  var target = (target && typeof(target) == 'string') ? target : null;
  if (!target) return exports.prices(callback);
  if (!sdk[target]) return callback(new Error('exchangers not found'));
  sdk[target]({}, function(err, result) {
    if (err) return callback(err);
    return callback(null, result.body);
  })
}