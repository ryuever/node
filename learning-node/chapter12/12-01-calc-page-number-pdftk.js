var spawn = require('child_process').spawn;

// invokes PDF Toolkit’s dump_data comment to discover information about a PDF,
// such as how many pages it contains:
var pdftk = spawn('pdftk', [__dirname + '/pdfs/python4.pdf', 'dump_data']);
pdftk.stdout.on('data', function (data) {
    // convert results to an object
    var array = data.toString().split('\n');
    var obj = {};

    array.forEach(function(line) {
	var tmp = line.split(':');
	obj[tmp[0]] = tmp[1];
    });
    // 通过键来显示，所以推测'NumberOfPages'应该肯定是dump_data中的一个key
    console.log(obj['NumberOfPages']);
});
pdftk.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
});
pdftk.on('exit', function (code) {
    console.log('child process exited with code ' + code);
});
