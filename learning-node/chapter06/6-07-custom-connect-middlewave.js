var connect = require('connect'), 
    fs =require('fs'),
    http = require('http');

// clear all session data
function clearSession(req, res, next) {
    if ('/clear' == req.url) {
  req.session = null;
	res.statusCode = 302;
	res.setHeader('Location', '/');
	res.end();
	console.log('in clearsession');
    } else {
	next();                               // next()就是一个调用下面一个函数的指令
    }
}
// track user
function trackUser(req, res, next) {
    req.session.ct = req.session.ct || 0;
    req.session.username = req.session.username || req.cookies.username;
    console.log(req.cookies.username + ' requested ' +
		req.session.ct++ + ' resources this session');
    next();
}
// cookie and session
var app = connect()
	//.use(connect.logger('dev'))           //如果不注释的花，当我们发出请求'localhost:8124/favicon.ico'会有日志产生
	.use(connect.favicon('/home/ryu/node-html/favicon.ico'))
	.use(connect.logger('dev'))             // 在log的后的middleware，只要有相应的请求就会记下来
	.use(connect.cookieParser('mumble'))
	.use(connect.cookieSession({key : 'tracking'}))
	.use(clearSession)
	.use(trackUser);
// static server
app.use(connect.static('/home/ryu/node-html'));
// start server and listen
http.createServer(app).listen(8124);
console.log('Server listening on port 8124');
