exports.list = function(map) {
  var list = [];
  Object.keys(map).forEach(function(name){
    map[name].name = name;
    list.push(map[name]);
  });
  return list;
};

exports.wash = function(k, v) {
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
  } else if (k == 'coinbase') {
    result.stat = v.amount ? 'ok' : 'error';
    result.last = v.amount ? v.amount : null;
  }
  return result;
};
