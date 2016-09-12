'use strict'

var Buffer = require('safe-buffer').Buffer

exports.encode = function (buf, opts) {
  if (buf.length !== 32) throw new Error('Invalid buffer')
  return Buffer.from(buf).toString('hex')
}

exports.decode = function (str) {
  str = str.slice(str.lastIndexOf('/') + 1)
  return Buffer.from(str, 'hex')
}
