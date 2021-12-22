[![deprecated](http://badges.github.io/stability-badges/dist/deprecated.svg)](https://github.com/hyperswarm/replicator) See [abstract-encoding](https://github.com/mafintosh/abstract-encoding) and [compact-encoding](https://github.com/compact-encoding) for similar functionality. 

More info on active projects and modules at [dat-ecosystem.org](https://dat-ecosystem.org/) <img src="https://i.imgur.com/qZWlO1y.jpg" width="30" height="30" /> 

---

# dat-encoding

[Dat](http://dat-data.com/)'s way of encoding and decoding dat links.

[![Build Status](https://travis-ci.org/juliangruber/dat-encoding.svg?branch=master)](https://travis-ci.org/juliangruber/dat-encoding)

## Example

```js
var encoding = require('dat-encoding')

var link = '6161616161616161616161616161616161616161616161616161616161616161'
var buf = encoding.decode(link)
console.log('%s -> %s', link, buf)
console.log('%s -> %s', buf, encoding.encode(buf))
```

## API

### .encode(buf)
### .toStr(buf)

Encode `buf` into a hex string. Throws if `buf` isn't 32 bytes of length.

If `buf` is already a string, checks if it's valid and returns it.

### .decode(str)
### .toBuf(str)

Decode `str` into its binary representation. Also supports `dat://` and `dat.com/` links. Throws if the raw link isn't 64 bytes of base64.

If `str` is already a buffer, checks if it's valid and returns it.

## License

MIT
