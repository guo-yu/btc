var _ = require('underscore'),
    async = require('async'),
    colors = require('colors'),
    moment = require('moment'),
    List = require('term-list'),
    consoler = require('consoler'),
    exec = require('child_process').exec,
    sdk = require('./sdk'),
    bitcoin = require('./bitcoin'),
    exchangers = require('./exchangers');

var wash = function(k, v) {
    var result = v;
    result.currency = exchangers.map[k].currency;
    if (k == 'btcchina') {
        result.stat = v.ticker && v.ticker.last ? 'ok' : 'error';
        result.last = v.ticker ? v.ticker.last : 'data error';
    } else if (k == 'bitstamp') {
        result.stat = v.last ? 'ok' : 'error';
        result.last = v.last;
    } else if (k == 'mtgox') {
        result.stat = v.data && v.data.last ? 'ok' : 'error';
        result.last = v.data && v.data.last ? v.data.last.value : null;
    } else if (k == 'fxbtc') {
        result.stat = v.result ? 'ok' : 'error';
        result.last = v.ticker ? v.ticker.ask : null;
    } else if (k == 'okcoin') {
        result.stat = v.ticker ? 'ok' : 'error';
        result.last = v.ticker ? v.ticker.last : null;
    } else if (k == 'btctrade') {
        result.stat = v.last ? 'ok' : 'error';
        result.last = v.last;
    } else if (k == 'chbtc') {
        result.stat = v.ticker ? 'ok' : 'error';
        result.last = v.ticker ? v.ticker.last : null;
    } else if (k == 'futures796') {
        result.stat = v.ticker ? 'ok' : 'error';
        result.last = v.ticker ? v.ticker.last : null;
    } else if (k == 'btc100') {
        result.stat = v.ticker ? 'ok' : 'error';
        result.last = v.ticker ? v.ticker.last : null;
    } else if (k == 'btce') {
        result.stat = v.ticker && v.ticker.last ? 'ok' : 'error';
        result.last = v.ticker ? v.ticker.last : null;
    }
    return result;
};

module.exports = function() {

    var menu = new List({
        maker: '\033[36m› \033[0m',
        markerLength: 2
    });

    menu._wash = wash;

    menu._configs = {
        autorefresh: 10000
    }

    menu._label = function(key, data) {
        var label = ' ';
        label += (data.last && data.stat == 'ok') ? colors.green(data.currency + ' ' + parseInt(data.last, 10).toFixed(2)) : colors.red('request fail');
        label += ' ';
        label += colors.grey(moment().format('HH:mm'));
        return label;
    };

    menu._fetchPrices = function(item, index, autorefresh) {
        var self = this;
        bitcoin.price(autorefresh ? false : item.name, function(err, result) {
            if (!err) {
                var data = self._wash(item.name, autorefresh ? result[item.name][0] : result),
                    label = data ? self._label(item.name, data) : colors.red(' request fail');
                self._relabel(index, label);
            } else {
                self._relabel(index, colors.red(' request fail'));
            }
        });
    }

    menu._align = function(s, max) {
        var repeat = function(length, s) {
            var f = s;
            for (var i = length - 1; i >= 0; i--) {
                f += s;
            };
            return f;
        };
        if (s && s.length < max) s += repeat(max - s.length, ' ');
        return s;
    }

    menu._relabel = function(index, label) {
        var exchanger = this.exchangers[index],
            afterfix = exchanger.autorefresh ? ' [Auto Refresh / ' + this._configs.autorefresh / 1000 + 's ]' : '';
        this.at(index).label = this._align(exchanger.name, 13) + label + colors.grey(afterfix);
        this.draw();
    };

    menu._clear = function() {
        _.each(this.exchangers, function(item, index) {
            item.autorefresh = false;
            if (item.refreshInterval) {
                clearInterval(item.refreshInterval);
                delete item.refreshInterval;
            }
        });
    };

    menu._updateAll = function(doing) {
        var self = this;
        _.each(this.exchangers, function(item, index) {
            doing(item, index);
            self._fetchPrices(item, index);
        });
    };

    menu._update = function() {
        var self = this;
        self._updateAll(function(item, index) {
            self._relabel(index, colors.yellow(' updating...'))
        });
    };

    menu._init = function() {
        var self = this;
        self._updateAll(function(item) {
            self.add(item.site, self._align(item.name, 13) + colors.yellow(' loading...'));
        });
        self.start();
    };

    menu.exchangers = exchangers.list();

    menu.on('keypress', function(key, item) {
        if (key) {
            if (key.name == 'return') {
                menu._clear();
                menu._update();
            } else if (key.name == 'a') {
                _.each(menu.items, function(item, index) {
                    if (item.id === menu.selected) {
                        var exchanger = menu.exchangers[index];
                        var refresh = function() {
                            menu._relabel(index, colors.yellow(' updating...'))
                            menu._fetchPrices(exchanger, index, true);
                        };
                        refresh();
                        if (exchanger.autorefresh) {
                            clearInterval(exchanger.refreshInterval);
                            delete exchanger.refreshInterval;
                        } else {
                            exchanger.refreshInterval = setInterval(refresh, menu._configs.autorefresh);
                        }
                        exchanger.autorefresh = !exchanger.autorefresh;
                    }
                });
                menu.draw();
            } else if (key.name == 'g') {
                exec('open ' + item);
            } else if (key.name == 'q') {
                menu._clear();
                menu.stop();
            } else {
                return false;
            }
        } else {
            return false;
        }
    });

    menu.on('empty', function() {
        menu.stop();
    });

    menu._init();
}