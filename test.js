var test = require('tape')
var enc = require('./')

test('encode', function (t) {
  t.equal(typeof enc.encode(Buffer('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')), 'string')
  t.equal(enc.encode(Buffer('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')), '2fdiu7i6kpzx4h9qos6eqldjghd2ut5hx0e8bekm0bkwiax3dt')
  t.equal(enc.encode('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'), '2fdiu7i6kpzx4h9qos6eqldjghd2ut5hx0e8bekm0bkwiax3dt')
  t.throws(function () { enc.encode('tooshort') })
  t.end()
})

test('decode', function (t) {
  t.ok(Buffer.isBuffer(enc.decode('42n3t42n3t42n3t42n3t42n3t42n3t42n3t42n3t42n3t42n3t')))
  t.deepEqual(
    enc.decode('2fdiu7i6kpzx4h9qos6eqldjghd2ut5hx0e8bekm0bkwiax3dt'),
    Buffer('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  )
  t.deepEqual(
    enc.decode('http://dat.land/2fdiu7i6kpzx4h9qos6eqldjghd2ut5hx0e8bekm0bkwiax3dt'),
    Buffer('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  )
  t.deepEqual(
    enc.decode('https://dat.land/2fdiu7i6kpzx4h9qos6eqldjghd2ut5hx0e8bekm0bkwiax3dt'),
    Buffer('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  )
  t.deepEqual(
    enc.decode('dat://2fdiu7i6kpzx4h9qos6eqldjghd2ut5hx0e8bekm0bkwiax3dt'),
    Buffer('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  )

  var legacy = {
    raw: Buffer('abcdabcdbacdbacdbacdbacdbacdbacd'),
    encoded: '6162636461626364626163646261636462616364626163646261636462616364'
  }
  t.deepEqual(enc.decode(legacy.encoded), legacy.raw, 'legacy hex encoding')

  t.throws(function () { enc.decode('too short') })

  t.end()
})

test('integration', function (t) {
  var input = Buffer('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  t.deepEqual(enc.decode(enc.encode(input)), input)
  t.end()
})
