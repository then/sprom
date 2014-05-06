'use strict';
var Promise = require('promise')
var concat = require('concat-stream')

exports = module.exports = buf

exports.end = end
function end(strm) {
  return new Promise(function(resolve, reject) {
    strm.on('error', reject)
    strm.resume() //make compatible with v0.10 streams
    strm.on('end', resolve)
  })
}

exports.buf = buf
function buf(strm) {
  return new Promise(function(resolve, reject) {
    strm.on('error', reject)
    strm.pipe(concat(resolve))
  })
}

exports.arr = arr
function arr(strm) {
  return new Promise(function(resolve, reject) {
    var arr = []
    strm.on('data', function(data) {
      if (arr) arr.push(data)
    })
    strm.on('end', function() {
      resolve(arr)
    })
    strm.on('error', function(err) {
      arr = null
      reject(err)
    })
  })
}
