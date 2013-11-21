var List = require('term-list'),
    bitcoin = require('./bitcoin'),
    async = require('async'),
    _ = require('underscore'),
    consoler = require('consoler'),
    colors = require('colors'),
    moment = require('moment'),
    sdk = require('./sdk');

var wash = function(k, v) {
    if (k == 'btcchina') {
        var last = _.last(v);
        return {
            timestamp: last[0],
            last: '¥ ' + last[1]
        }
    } else if (k == 'bitstamp') {
        var data = v;
        data.last = '$ ' + data.last;
        return data;
    } else {
        return v;
    }
};

var label = function(key, data) {
    var str = ' ';
    if (data.last) str += colors.green(data.last) + ' ';
    if (data.timestamp) {
        if (key == 'btcchina') {
            str += colors.grey(moment(data.timestamp).format('HH:mm')) + ' '
        } else {
            str += colors.grey(moment.unix(data.timestamp).format('HH:mm')) + ' '
        }
    }
    return str;
}

var update = function(menu, within) {
    _.each(menu.exchangers, function(item, index){
        within(item, index);
        bitcoin.price(item.name, function(err, result){
            if (!err) {
                var data = wash(item.name, result);
                menu._update(index, label(item.name, data));
            } else {
                menu._update(index, colors.red('request fail' + err.toString()));
            }
        });
    });
}

var init = function(menu) {
    update(menu, function(item){
        menu.add(item.url, item.name + colors.yellow(' loading...'));
    });
    menu.start();
}

module.exports = function() {
    var menu = new List({
        maker: '\033[36m› \033[0m',
        markerLength: 2
    });
    menu._update = function(index, label) {
        this.at(index).label = this.exchangers[index].name + ' ' + label;
        this.draw();
    };
    menu.exchangers = bitcoin.exchangers(sdk);
    menu.on('keypress', function(key, item) {
        if (key.name == 'enter') {
            update(menu, function(item, index){
                menu._update(index, colors.yellow('updating...'))
            });
        }
    });
    menu.on('empty', function() {
        menu.stop();
    });
    init(menu);
}