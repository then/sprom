# sprom

Convert node.js Streams into Promises

[![Build Status](https://img.shields.io/travis/then/sprom/master.svg)](https://travis-ci.org/then/sprom)
[![Dependency Status](https://img.shields.io/david/then/sprom.svg)](https://david-dm.org/then/sprom)

## Installation

    $ npm install sprom

## Usage


```javascript
sprom.end(request(url).pipe(fs.createWriteStream('file.json')))
  .then(function () {
    console.log('Successfully wrote file');
  }, function (err) {
    console.error('Failed to write file');
    console.error(err.stack || err.message || err);
  });
sprom(request(url))
  .then(function (body) {
    console.dir(JSON.parse(body.toString()));
  })
  .then(null, function (err) {
    console.error('Failed to read JSON');
    console.error(err.stack || err.message || err);
  });
```

## API

### sprom.end(stream)

Get a promise that is resolved when the stream has ended.  This won't make any attempt to look at the data of the stream.

### sprom.buf(stream)

Buffers the contents of the stream using `concat-stream` and returns a promise for the concatenated results.

### sprom.arr(stream)

Buffers the contents of the stream into an array and returns a promise for the array.

## License

MIT
