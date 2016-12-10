'use strict'

var Buffer = require('safe-buffer').Buffer

exports.encode = function (buf, opts) {
  if (buf.length !== 32) throw new Error('Invalid buffer')
  return Buffer.from(buf).toString('hex')
}

exports.decode = function (str) {
  var match = /(?:[a-z]+:\/\/(?:dat\.land\/)?)?([^/]{64})/.exec(str)
  if (!match) throw new Error('Invalid key')
  return Buffer.from(match[1], 'hex')
}
