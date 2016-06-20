
# dat-encoding

[Dat](http://dat-data.com/)'s way of encoding and decoding dat links. Pretty similar to base36!

[![Build Status](https://travis-ci.org/juliangruber/dat-encoding.svg?branch=master)](https://travis-ci.org/juliangruber/dat-encoding)

## Example

```js
var encoding = require('dat-encoding')

var input = 'quite rad'
var encoded = encoding.encode(input)
console.log('%s -> %s', input, encoded)
console.log('%s -> %s', encoded, encoding.decode(encoded))
```

## API

### .encode(buf)

Encode `buf` into a string that works well in urls.

### .decode(str)

Decode `str` into its binary representation. If `str` is a 64 character legacy link, simply applies hex decoding. Also supports `dat://` and `dat.com/` links.

## License

MIT
