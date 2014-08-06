var open = require('open');
var async = require('async');
var _ = require('underscore');
var colors = require('colors');
var moment = require('moment');
var consoler = require('consoler');
var List = require('term-list-enhanced');
var sdk = require('./sdk');
var utils = require('./utils');
var bitcoin = require('./bitcoin');
var exchangers = require('./exchangers');

module.exports = cli;

function cli() {

  var menu = new List();

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
      if (err) {
        return self._relabel(index, colors.red(' request fail'));
      }
      var data = utils.wash(item.name, autorefresh ? result[item.name][0] : result);
      var label = data ? self._label(item.name, data) : colors.red(' request fail');
      self._relabel(index, label);
    });
  };

  menu._align = function(s, max) {
    function repeat(length, s) {
      var f = s;
      for (var i = length - 1; i >= 0; i--) {
        f += s;
      };
      return f;
    }
    if (s && s.length < max) s += repeat(max - s.length, ' ');
    return s;
  };

  menu._relabel = function(index, label) {
    var exchanger = this.exchangers[index];
    var afterfix = exchanger.autorefresh ? ' [Auto Refresh / ' + this._configs.autorefresh / 1000 + 's ]' : '';
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
    if (!key) return false;
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
      open(item);
    } else if (key.name == 'q') {
      process.exit();
    } else {
      return false;
    }
  });

  menu.on('empty', function() {
    menu.stop();
  });

  menu._init();
}
