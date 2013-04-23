var promise = require('promise');
var concat = require('concat-stream');

exports = (module.exports = buf);

exports.end = end;
function end(strm) {
  return promise(function (resolve, reject) {
    strm.on('error', reject);
    strm.on('data', function () {
      //make compatible with v0.10 streams
    });
    strm.on('end', resolve);
  });
}

exports.buf = buf;
function buf(strm) {
  return promise(function (resolve, reject) {
    strm.on('error', reject);
    strm.pipe(concat(function (err, res) {
      if (err) return reject(err);
      else return resolve(res);
    }));
  });
}