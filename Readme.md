# FileDuplex

Allows to create a read and write Duplex stream for files. Install it with `npm install file-duplex`, which is especiall handy for UNIX special files.

## Example
```javascript
var FileDuplex = require('file-duplex');

var file = new FileDuplex('/dev/ttys1');

process.stdin.pipe(file).pipe(process.stdout);
```