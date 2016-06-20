
# dat-encoding

[Dat](http://dat-data.com/)'s way of encoding and decoding dat links. Pretty similar to base36!

[![Build Status](https://travis-ci.org/juliangruber/dat-encoding.svg?branch=master)](https://travis-ci.org/juliangruber/dat-encoding)

## Example

```js
var encoding = require('dat-encoding')

var link = '2fdiu7i6kpzx4h9qos6eqldjghd2ut5hx0e8bekm0bkwiax3dt'
var buf = encoding.decode(link)
console.log('%s -> %s', link, buf)
console.log('%s -> %s', buf, encoding.encode(buf))
```

## API

### .encode(buf)

Encode `buf` into a string that works well in urls.

### .decode(str)

Decode `str` into its binary representation. If `str` is a 64 character legacy link, simply applies hex decoding. Also supports `dat://` and `dat.com/` links.

## License

MIT
