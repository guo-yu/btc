## ![logo](http://ww2.sinaimg.cn/large/61ff0de3gw1easknn74dvj2019019t8i.jpg) btc ![npm](https://badge.fury.io/js/btc.png)

a command-line bitcoin price board for geeks

![screenshot](http://ww3.sinaimg.cn/large/61ff0de3gw1easzjzw8d6j20hn0ar74z.jpg)

### Installation
````
$ [sudo] npm install btc -g
````

### Command Line Interface
just run `btc` , prices board will show
````
$ btc 
````
#### Shortcuts
btc cli provides some useful shortcuts for you:
````
[enter]  ->  refresh prices as you wish
[g]      ->  go to current exchange market
[a]      ->  autorefresh the current exchange market every 10 seconds, 
             press [a] to cancel or [enter] to cancel all
[q]      ->  quit
````

### Example
````javascript
var btc = require('btc');

// fetch a prices list
btc.price(function(err, prices){
    console.log(prices);
});

// fetch a seleced exchanger
btc.price('btcchina', function(err, prices){
    console.log(prices);
});
````

### Add your coin's API
please feel free to add new coin's api:
````
$ git clone https://github.com/turingou/btc.git && cd btc
$ vi ./libs/exchangers.js
````
make sure every api has its unique `url` `site` and fill param `currency`.

### API
check this file: `index.js`

btc supports exchanges below:

- [btcchina](https://www.btcchina.com/): the bitcoin largest exchanger in China
- [mtgox](https://www.mtgox.com/)
- [bitstamp](https://www.bitstamp.net/)
- [btce](https://btc-e.com/)
- [futures796](http://bitcoinwisdom.com/markets/796/futures)
- [coinbase](https://coinbase.com)
- [okcoin](https://www.okcoin.com/)
- [chbtc](https://www.chbtc.com/)
- [fxbtc](http://www.fxbtc.com/)
- [btctrade](http://www.btctrade.com/)
- [btc100](https://btc100.org/)

### Contributors
```
 project  : btc
 repo age : 7 weeks
 active   : 12 days
 commits  : 24
 files    : 11
 authors  :
    14  Guo Yu                  58.3%
     4  Connor Keenan           16.7%
     2  Aleksander Gregorka     8.3%
     2  Glenn Murray            8.3%
     1  Andrew Seidl            4.2%
     1  ekousp                  4.2%
```

### Contributing
- Fork this repo
- Clone your repo
- Install dependencies
- Checkout a feature branch
- Feel free to add your features
- Make sure your features are fully tested
- Open a pull request, and enjoy <3

### MIT license
Copyright (c) 2013 turing &lt;o.u.turing@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

---
![docor](https://cdn1.iconfinder.com/data/icons/windows8_icons_iconpharm/26/doctor.png)
generated using [docor](https://github.com/turingou/docor.git) @ 0.1.0. brought to you by [turingou](https://github.com/turingou)
