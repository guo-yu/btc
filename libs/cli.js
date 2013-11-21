var List = require('term-list'),
    bitcoin = require('./bitcoin'),
    async = require('async'),
    _ = require('underscore'),
    consoler = require('consoler'),
    colors = require('colors');

var wash = function(k, v) {
    if (k == 'btcchina') {
        var last = _.last(v[0]);
        return {
            timestamp: last[0],
            last: 'RMB: ' + last[1],
            url: "https://www.btcchina.com/"
        }
    } else if (k == 'bitstamp') {
        var data = v[0];
        data.last = '$: ' + data.last;
        data.url = 'https://www.bitstamp.net/';
        return data;
    } else {
        return v;
    }
};

var label = function(key, data) {
    var str = key + ' ';
    if (data.last) str += colors.green(data.last) + ' ';
    if (data.timestamp) str += colors.grey(new Date(data.timestamp * 1000).getHours() + ':' + new Date(data.timestamp * 1000).getMinutes()) + ' ';
    return str;
}

module.exports = function() {
    var menu = new List({
        maker: '\033[36m› \033[0m',
        markerLength: 2
    });
    menu.on('keypress', function(key, item) {
        console.log(item);
    });
    menu.on('empty', function() {
        menu.stop();
    });
    consoler.loading('loading bitcoin prices')
    bitcoin.price(function(err, results) {
        _.each(results, function(v, k) {
            var result = wash(k, v);
            menu.add(result, label(k, result));
        });
        menu.start();
    });
}