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
  t.end()
})

test('integration', function (t) {
  t.equal(enc.decode(enc.encode(Buffer('hey'))).toString(), 'hey')
  t.end()
})
