'use strict'

var Buffer = require('safe-buffer').Buffer

function validateString (str) {
  // looking for an hexa string of 64 or 65 consecutive chars
  var match = /([a-f0-9]{64,65})/i.exec(str)
  // we need exactly 64, so an hexa string with 65 chars (or more) is not allowed
  if (!match || match[1].length !== 64) throw new Error('Invalid key')
  return match[1]
}

function validateBuffer (buf) {
  if (buf.length !== 32) throw new Error('Invalid buffer')
  return buf
}

function encode (buf) {
  if (typeof buf === 'string') return validateString(buf)
  if (!Buffer.isBuffer(buf)) throw new Error('Not a buffer')
  return validateBuffer(buf).toString('hex')
}

function decode (str) {
  if (Buffer.isBuffer(str)) return validateBuffer(str)
  if (typeof str !== 'string') throw new Error('Not a string')
  return Buffer.from(validateString(str), 'hex')
}

exports.encode = exports.toStr = encode
exports.decode = exports.toBuf = decode
