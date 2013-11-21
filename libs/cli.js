var List = require('term-list'),
    bitcoin = require('./bitcoin'),
    async = require('async'),
    _ = require('underscore'),
    consoler = require('consoler'),
    colors = require('colors'),
    sdk = require('./sdk');

var wash = function(k, v) {
    if (k == 'btcchina') {
        var last = _.last(v);
        return {
            timestamp: last[0],
            last: 'RMB: ' + last[1]
        }
    } else if (k == 'bitstamp') {
        var data = v;
        data.last = '$: ' + data.last;
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
    menu._update = function(index, label) {
        this.at(index).label = this.exchangers[index].name + ' ' + label;
        this.draw();
    }
    menu.exchangers = bitcoin.exchangers(sdk);
    consoler.loading('loading bitcoin prices...');
    _.each(menu.exchangers, function(item, index){
        menu.add(item.url, item.name + colors.yellow(' loading...'));
        bitcoin.price(item.name, function(err, result){
            if (!err) {
                var data = wash(item.name, result);
                menu._update(index, label(item.name, data));
            } else {
                menu._update(index, colors.red('request fail'));
            }
        });
    });
    menu.start();
    menu.on('keypress', function(key, item) {
        console.log(item.url);
    });
    menu.on('empty', function() {
        menu.stop();
    });
}