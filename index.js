'use strict'

var baseX = require('base-x')
var Buffer = require('safe-buffer').Buffer

var alphabet = '0123456789abcdefghijklmnopqrstuvwxyz'
var encoding = baseX(alphabet)

exports.encode = function (buf) {
  if (buf.length !== 32) throw new Error('Invalid buffer')
  buf = Buffer.from(buf)
  return encoding.encode(buf)
}

exports.decode = function (str) {
  str = str.slice(str.lastIndexOf('/') + 1)
  if (/[0-9a-f]{64}/i.test(str)) return Buffer.from(str, 'hex')
  if (str.length !== 50) throw new Error('Invalid key')
  return Buffer.from(encoding.decode(str))
}
