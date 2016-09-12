var test = require('tape')
var enc = require('./')

test('encode', function (t) {
  t.equal(typeof enc.encode(Buffer('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')), 'string')
  t.equal(enc.encode(Buffer('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')), '2fdiu7i6kpzx4h9qos6eqldjghd2ut5hx0e8bekm0bkwiax3dt')
  t.equal(enc.encode('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'), '2fdiu7i6kpzx4h9qos6eqldjghd2ut5hx0e8bekm0bkwiax3dt')
  t.throws(function () { enc.encode('tooshort') })
  t.equal(enc.encode(Buffer('0100000000000000ffffffff0000000000008004010000004012800201000000', 'hex')), '00waum9lsz88rt2zltcysggj4yc0odk8uwwrq05shegvktfgu8')

  t.test('legacy: true', function (t) {
    t.equal(
      enc.encode(Buffer('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')).length,
      50
    )
    t.equal(
      enc.encode(
        Buffer('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'),
        { legacy: true }
      ).length,
      64
    )
    t.end()
  })
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

  t.deepEqual(
    enc.decode('00waum9lsz88rt2zltcysggj4yc0odk8uwwrq05shegvktfgu8'),
    Buffer('0100000000000000ffffffff0000000000008004010000004012800201000000', 'hex')
  )

  t.end()
})

test('integration', function (t) {
  var input = Buffer('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  t.deepEqual(enc.decode(enc.encode(input)), input)

  input = Buffer('0900000001000000561ce777010000009082e70001000000bf000000ffffffff', 'hex')
  t.deepEqual(enc.decode(enc.encode(input)), input)

  input = Buffer(32)
  t.deepEqual(enc.decode(enc.encode(input)), input)

  t.end()
})
