# FileDuplex

Allows to create a read and write Duplex stream for files. Install it with `npm install file-duplex`, which is especiall handy for UNIX special files. 

Since I didn't find a good way in Node to wait for the read event of the file, there is a timeout specified in case the file returns no bytes to avoid CPU intensive loops. The waiting time of the timeout can be changed through the options attributes `readTimeout`. It's default value is 50. It's a workaround. It would be nicer to use `fs.watch` for this, however at least on OSX this doesn't work properly for device files.

## Example
```javascript
var FileDuplex = require('file-duplex');

var file = new FileDuplex('/dev/ttys1');

process.stdin.pipe(file).pipe(process.stdout);
```