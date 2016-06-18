var test = require('tape')
var enc = require('./')

test('encode', function (t) {
  t.equal(typeof enc.encode(Buffer('hey')), 'string')
  t.equal(enc.encode(Buffer('hey')), '42n3t')
  t.equal(enc.encode('hey'), '42n3t')
  t.end()
})

test('decode', function (t) {
  t.ok(Buffer.isBuffer(enc.decode('42n3t')))
  t.deepEqual(enc.decode('42n3t'), Buffer('hey'))
  t.deepEqual(enc.decode('http://dat.lin/42n3t'), Buffer('hey'))
  t.deepEqual(enc.decode('https://dat.lin/42n3t'), Buffer('hey'))
  t.deepEqual(enc.decode('dat://42n3t'), Buffer('hey'))

  var legacy = {
    raw: Buffer('abcdabcdbacdbacdbacdbacdbacdbacd'),
    encoded: '6162636461626364626163646261636462616364626163646261636462616364'
  }
  t.deepEqual(enc.decode(legacy.encoded), legacy.raw, 'legacy hex encoding')

  t.end()
})

test('integration', function (t) {
  t.equal(enc.decode(enc.encode(Buffer('hey'))).toString(), 'hey')
  t.end()
})
