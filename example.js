var device = '/dev/tty.HUAWEIMobile-Pcui';

var ReadWriteStream = require('./index.js');

var file = new ReadWriteStream(device);

process.stdin.pipe(file).pipe(process.stdout);