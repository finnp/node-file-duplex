var Duplex = require('stream').Duplex;
var fs = require('fs');
var util = require('util');
var extend = require('extend');

function DuplexStream(path) {
  Duplex.call(this);
  fs.ReadStream.call(this, path, {'flags': 'r+'});
}
util.inherits(DuplexStream, Duplex);
// extend(true, DuplexStream.prototype, fs.ReadStream.prototype, fs.WriteStream.prototype);
DuplexStream.prototype._read = fs.ReadStream.prototype._read;
DuplexStream.prototype._write = fs.WriteStream.prototype._write;

module.exports = DuplexStream;

