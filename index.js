var util = require('util');
var fs = require('fs');
var Duplex = require('stream').Duplex;

function ReadWriteStream(path) {
  Duplex.call(this);
  var self = this;
  self.path = path;
  self.readBuffer = new Buffer(255);
  self.fd = 0;

  fs.open(path, 'r+', function(err, fd) {
    self.fd = fd;
  });

};
util.inherits(ReadWriteStream, Duplex);

ReadWriteStream.prototype._write = function(chunk, enc, done) {
  var self = this;
  // chunk has to be a buffer

  fs.write(self.fd, chunk, 0, chunk.length, null, function(err, bytesWritten) {
    done(err);
  });
};

ReadWriteStream.prototype._read = function(size) {
  var self = this;
  if(size) {
    self.readBuffer = new Buffer(size);
  }
  fs.read(self.fd, self.readBuffer, readBuffer.length, null, function(err, bytesRead) {
    self.push(buffer.slice(0, bytesRead));
  });
};