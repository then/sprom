# sprom

Convert node.js Streams into Promises

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

Get a promise that buffers the contents of the stream using `concat-stream` and then returns a promise for the concatenated results.

## License

MIT