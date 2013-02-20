// To implement this in Node, we need to use a child process. For extensibility, the application should also 
// take the name of the input URL, as well as the output file. just like command 
// "wkhtmltopdf shortcut.html short.pdf" on shell

var spawn = require('child_process').spawn;
// command line arguments
var url = process.argv[2];
var output = process.argv[3];
if (url && output) {
    var wkhtmltopdf = spawn('wkhtmltopdf', [url, output]);
    wkhtmltopdf.stdout.setEncoding('utf8');
    wkhtmltopdf.stdout.on('data', function (data) {
	console.log(data);
    });
    wkhtmltopdf.stderr.on('data', function (data) {
	console.log('stderr: ' + data);
    });
    wkhtmltopdf.on('exit', function (code) {
	console.log('child process exited with code ' + code);
    });
} else {
    console.log('You need to provide a URL and output file name');
}
