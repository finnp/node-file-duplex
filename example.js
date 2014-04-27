var device = '/dev/tty.HUAWEIMobile-Pcui';

var ReadWriteStream = require('./index.js');

var file = new ReadWriteStream(device);

process.stdin.pipe(file).pipe(process.stdout);

file.pipe(process.stdout);
// process.stdin.pipe(file);

file.on('open', function() {
  console.log('Open');
});