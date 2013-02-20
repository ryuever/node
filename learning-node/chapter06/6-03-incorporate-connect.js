var connect = require('connect');
var http = require('http');
var app = connect()
  .use(connect.favicon())
	.use(connect.logger())
	.use(function(req,res) {
	    res.end('Hello World\n');
	});
http.createServer(app).listen(8124);

// Incorporating Connect bundled middleware into an application directly
// 下面这个是对上面的一个整合
var connect = require('connect');
var http = require('http');
http.createServer(connect()
		  .use(connect.favicon())
		  .use(connect.logger())
		  .use(function(req,res) {
		      res.end('Hello World\n');
		  })).listen(8124);

// 下面的这个形式实现的是跟6-2一样的功能，都是创建一个static file server
// connect.static 第一个参数是root path，and optional object as the second.在这里没有列出来
// connect.logger 其实就是设置显示日志的format,默认是在stdout打印，我们这里把它关联到log.txt文件中，format='dev',只是
// 它的一种显示方式，如果不设置的话用默认的format.
var connect = require('connect'),
    http = require('http'),
    fs = require('fs'),
    __dirname = '/home/ryu';
var writeStream = fs.createWriteStream('./log.txt',
				       {'flags' : 'a',
					'encoding' : 'utf8',
					'mode' : 0666});
http.createServer(connect()
		  .use(connect.logger({format : 'dev', stream : writeStream }))
		  .use(connect.static(__dirname + '/node-html'))
		 ).listen(8124);
		 
// omit like below
GET /example1.html 304 4ms
