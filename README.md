
# dat-encoding

Dat's way of encoding and decoding dat links. Pretty similar to base36!

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
### .decode(str)

## License

MIT
