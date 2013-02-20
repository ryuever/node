var http = require('http');
var server = http.createServer();

var cnt = 0;

server.on('request',function(req,res){
    cnt++;
    res.writeHead(200,{'content-type':'text/plain,charset=utf-8', 'Access-Control-Allow-Origin':'*'});
    res.write('Welcome to black company !\n');
    res.write('you' + cnt);
    res.end();
});

server.listen(8000);
