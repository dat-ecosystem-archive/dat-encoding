'use strict'

var baseX = require('base-x')
var Buffer = require('safe-buffer').Buffer

var alphabet = '0123456789abcdefghijklmnopqrstuvwxyz'
var encoding = baseX(alphabet)

exports.encode = function (buf) {
  buf = Buffer.from(buf)
  return encoding.encode(buf)
}

exports.decode = function (str) {
  str = str.slice(str.lastIndexOf('/') + 1)
  if (str.length === 64) return Buffer.from(str, 'hex')
  return Buffer.from(encoding.decode(str))
}
