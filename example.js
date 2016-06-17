var encoding = require('.')

var input = 'quite rad'
var encoded = encoding.encode(input)
console.log('%s -> %s', input, encoded)
console.log('%s -> %s', encoded, encoding.decode(encoded))
