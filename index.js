'use strict'

var baseX = require('base-x')
var Buffer = require('safe-buffer').Buffer
var assert = require('assert')

var alphabet = '0123456789abcdefghijklmnopqrstuvwxyz'
var encoding = baseX(alphabet)

exports.encode = function (buf) {
  assert(buf.length === 32, 'Invalid buffer')
  buf = Buffer.from(buf)
  return encoding.encode(buf)
}

exports.decode = function (str) {
  str = str.slice(str.lastIndexOf('/') + 1)
  if (str.length === 64) return Buffer.from(str, 'hex')
  assert(str.length === 50, 'Invalid key')
  return Buffer.from(encoding.decode(str))
}
