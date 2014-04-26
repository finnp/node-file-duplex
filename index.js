var util = require('util');
var fs = require('fs');
var Duplex = require('stream').Duplex;

function ReadWriteStream(path) {
  Duplex.call(this);
  var self = this;
  self.path = path;
  self.readBuffer = new Buffer(255);
  self.fd = null;

  fs.open(path, 'r+', function(err, fd) {
    self.fd = fd;
    self.emit('open', fd);
  });

};
util.inherits(ReadWriteStream, Duplex);

ReadWriteStream.prototype._write = function(chunk, enc, done) {
  var self = this;
  if(!self.fd) {
    return self.once('open', function() {
      self._write(chunk, enc, done);
    });
  }
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
  if(!this.fd) {
    this.once('open', this._readFile);
  } else {
    this._readFile();
  }
};

module.exports = ReadWriteStream;