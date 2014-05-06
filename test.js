var sprom = require('./');
var through = require('through');
var assert = require('assert');

var fixture = {};
function good() {
  var s = through();
  setTimeout(function () {
    s.queue('{');
    s.queue('"message"');
    setTimeout(function () {
      s.queue(':');
      s.queue('"success"');
      s.queue('}');
      s.queue(null);
    }, 20);
  }, 20);
  return s;
}
function bad() {
  var s = through();
  setTimeout(function () {
    s.emit('error', fixture);
    s.emit('error', {});
  }, 20);
  return s;
}
describe('sprom.end', function () {
  describe('with a successful stream', function () {
    it('resolves once the stream is finished', function (done) {
      var gd = good();
      var buf = '';
      gd.on('data', function (data) {
        buf += data;
      });
      sprom.end(gd)
        .then(function (res) {
          assert.equal(typeof res, 'undefined');
          assert.equal(JSON.parse(buf).message, 'success');
          done();
        })
        .then(null, function (err) {
          done(err || 'Rejected');
        });
    });
  });
  describe('with a failing stream', function () {
    it('rejects with the first emitted error', function (done) {
      var bd = bad();
      sprom.end(bd)
        .then(function () {
          throw (new Error('Should have been rejected'));
        }, function (err) {
          assert(err === fixture);
          done();
        })
        .then(null, function (err) {
          done(err || 'Rejected');
        });
    });
  });
});
describe('sprom.buf', function () {
  describe('with a successful stream', function () {
    it('resolves once the stream is finished with the buffered content of the stream', function (done) {
      var gd = good();
      sprom.buf(gd)
        .then(function (buf) {
          assert.equal(JSON.parse(buf.toString()).message, 'success');
          done();
        })
        .then(null, function (err) {
          done(err || 'Rejected');
        });
    });
  });
  describe('with a failing stream', function () {
    it('rejects with the first emitted error', function (done) {
      var bd = bad();
      sprom.buf(bd)
        .then(function () {
          throw (new Error('Should have been rejected'));
        }, function (err) {
          assert(err === fixture);
          done();
        })
        .then(null, function (err) {
          done(err || 'Rejected');
        });
    });
  });
});
describe('sprom.arr', function () {
  describe('with a successful stream', function () {
    it('resolves once the stream is finished with an array of the content of the stream', function (done) {
      var gd = good();
      sprom.arr(gd)
        .then(function (arr) {
          assert.deepEqual(arr, ['{', '"message"', ':', '"success"', '}']);
          done();
        })
        .then(null, function (err) {
          done(err || 'Rejected');
        });
    });
  });
  describe('with a failing stream', function () {
    it('rejects with the first emitted error', function (done) {
      var bd = bad();
      sprom.arr(bd)
        .then(function () {
          throw (new Error('Should have been rejected'));
        }, function (err) {
          assert(err === fixture);
          done();
        })
        .then(null, function (err) {
          done(err || 'Rejected');
        });
    });
  });
});
