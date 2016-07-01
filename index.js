'use strict'

var baseX = require('base-x')
var Buffer = require('safe-buffer').Buffer

var alphabet = '0123456789abcdefghijklmnopqrstuvwxyz'
var encoding = baseX(alphabet)

exports.encode = function (buf) {
  if (buf.length !== 32) throw new Error('Invalid buffer')
  buf = Buffer.from(buf)
  var str = encoding.encode(buf)
  while (str.length < 50) str = '0' + str
  return str
}

exports.decode = function (str) {
  return decode(str, true)
}

function decode (str, checkLength) {
  str = str.slice(str.lastIndexOf('/') + 1)
  if (/[0-9a-f]{64}/i.test(str)) return Buffer.from(str, 'hex')
  if (checkLength && str.length !== 50) throw new Error('Invalid key')
  var buf = Buffer.from(encoding.decode(str))
  if (buf.length > 32) return decode(str.slice(1, str.length), false)
  return buf
}
