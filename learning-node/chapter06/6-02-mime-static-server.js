var http =require('http'),
    url =require('url'),
    fs   =require('fs'),
    mime =require('mime');

base ='/home/ryu/node-html';
http.createServer(function (req, res) {
    pathname = base + req.url;
    console.log(pathname);           // the output is /home/ryu/node-html/example.html
    fs.stat(pathname, function(err, stats) {
  if (err) {
	    res.writeHead(404);
	    res.write('Bad request 404\n');
	    res.end();
	} else if (stats.isFile()) {
	    // content type
	    var type = mime.lookup(pathname);
	    console.log(type);
	    res.setHeader('Content-Type', type);
	    // 200 status - found, no errors
	    res.statusCode = 200;
	    // create and pipe readable stream
	    var file = fs.createReadStream(pathname);
	    file.on("open", function() {
		file.pipe(res);
	    });
	    file.on("error", function(err) {
		console.log(err);
	    });
	} else {
	    res.writeHead(403);
	    res.write('Directory access is forbidden');    // we can't read content from a directory, it should be a file.
	    res.end();
	}
    });
}).listen(8124);
console.log('Server running at 8124/');
