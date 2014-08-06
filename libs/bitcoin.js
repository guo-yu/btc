var async = require('async');
var sdk = require('./sdk');
var utils = require('./utils');
var exchangers = require('./exchangers');

exports.price = price;
exports.prices = prices;

function price(target, callback) {
  if (!target) return callback(new Error('exchange is required'));
  if (!sdk[target]) return callback(new Error('exchange not found'));
  return sdk[target]({}, callback);
}

function prices(callback) {
  var results = {};

  async.each(utils.list(exchangers), fetch, function(err) {
    callback(err, results);
  });

  function fetch(exchange, cb) {
    var target = exchange.name;
    if (!sdk[target]) return cb(null);
    exports.price(target, function(err, res, body) {
      if (err) return cb(err);
      results[target] = [];
      if (res.statusCode == 200) results[target].push(body);
      return cb(null);
    });
  };
}