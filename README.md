## ![logo](http://ww2.sinaimg.cn/large/61ff0de3gw1easknn74dvj2019019t8i.jpg) btc ![npm](https://badge.fury.io/js/btc.png)

a bitcoin price watcher for geeks

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
#### Command Line Interface Shotcuts
btc cli provides some useful shotcuts for you:
````
[enter]  ->  refresh prices as you wish
[g]      ->  go to current exchange market
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

### API
check this file: `index.js`

btc supports exchanges below:

- [btcchina](https://www.btcchina.com/): the bitcoin largest exchanger in China
- [mtgox](https://www.mtgox.com/)
- [bitstamp](https://www.bitstamp.net/)

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