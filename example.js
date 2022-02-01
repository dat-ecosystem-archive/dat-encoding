var encoding = require('.')

var link = '62cb0c9a95dd0413aba8d8c7fe1f6c4427f12b06d798e7332674d98832061962'

var buf = encoding.decode(link)
console.log('%s -> %s', link, buf)
console.log('%s -> %s', buf, encoding.encode(buf))
