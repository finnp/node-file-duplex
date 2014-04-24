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

ReadWriteStream.prototype._readFile = function() {
  var self = this;
  fs.read(self.fd, self.readBuffer, 0, self.readBuffer.length, null, function(err, bytesRead) {
    if(self.push(self.readBuffer.slice(0, bytesRead))) {
      self._readFile();
    }
  });
};


ReadWriteStream.prototype._read = function() {
  var self = this;
  self._readFile();
};

module.exports = ReadWriteStream;