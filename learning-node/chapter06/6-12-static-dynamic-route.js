var connect = require('connect'),
    http = require('http'),
    fs = require('fs'),
    crossroads = require('crossroads'),
    httpProxy = require('http-proxy'),
    base = '/home/ryu/node-html';]

// create the proxy that listens for all requests
httpProxy.createServer(function(req,res,proxy) {
    if (req.url.match(/^\/node\//))
  proxy.proxyRequest(req, res, {
	    host: 'localhost',
	    port: 8000
	});
    else
	proxy.proxyRequest(req,res, {
	    host: 'localhost',
	    port: 8124
	});
}).listen(9000);

// add route for request for dynamic resource
crossroads.addRoute('/node/{id}/', function(id) {
    console.log('accessed node ' + id);
});

// dynamic file server
http.createServer(function(req,res) {
    crossroads.parse(req.url);
    res.end('that\'s all!');
}).listen(8000);

// static file server
http.createServer(connect()
		  .use(connect.favicon())
		  .use(connect.logger('dev'))
		  .use(connect.static(base))
		 ).listen(8124);

// 其实我刚开始看的时候，就很郁闷他怎么知道这个是到dynamic server还是到static server，其实这个是根据你的
// request的接口来判断的，并没有什么特殊。
http://localhost:9000/node/123   //因为我们定义当request这个接口时，发生代理到8000端口的服务器
http://localhost:8000/node/321
http://localhost:8124/example.html
http://localhost:9000/example.html
omit :
accessed node 123
accessed node 321
GET /example.html 304 10ms
GET /example.html 200 4ms - 109
