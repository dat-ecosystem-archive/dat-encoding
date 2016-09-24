var test = require('tape')
var enc = require('./')

test('encode', function (t) {
  t.equal(typeof enc.encode(Buffer('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')), 'string')
  t.equal(enc.encode(Buffer('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')), '6161616161616161616161616161616161616161616161616161616161616161')
  t.equal(enc.encode('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'), '6161616161616161616161616161616161616161616161616161616161616161')
  t.throws(function () { enc.encode('tooshort') })
  t.equal(enc.encode(Buffer('0100000000000000ffffffff0000000000008004010000004012800201000000', 'hex')), '0100000000000000ffffffff0000000000008004010000004012800201000000')
  t.end()
})

test('decode', function (t) {
  t.ok(Buffer.isBuffer(enc.decode('6161616161616161616161616161616161616161616161616161616161616161')))
  t.deepEqual(
    enc.decode('6161616161616161616161616161616161616161616161616161616161616161'),
    Buffer('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  )
  t.deepEqual(
    enc.decode('http://dat.land/6161616161616161616161616161616161616161616161616161616161616161'),
    Buffer('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  )
  t.deepEqual(
    enc.decode('https://dat.land/6161616161616161616161616161616161616161616161616161616161616161'),
    Buffer('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  )
  t.deepEqual(
    enc.decode('dat://6161616161616161616161616161616161616161616161616161616161616161'),
    Buffer('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  )

  t.throws(function () { enc.decode('100') }) // too short
  t.throws(function () { enc.decode('invalid characters') })

  t.deepEqual(
    enc.decode('0100000000000000ffffffff0000000000008004010000004012800201000000'),
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
