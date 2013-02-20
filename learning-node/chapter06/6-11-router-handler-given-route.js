var crossroads = require('crossroads'),
http = require('http');
var typeRoute = crossroads.addRoute('/{type}/{id}');

//下面这一步跟6-10相比，它把handler部分当作callback整合到里面了。但是我们这个的好处呢？
function onTypeAccess(type,id) {
    console.log('access ' + type + ' ' + id);
};

typeRoute.matched.add(onTypeAccess);      //给matched pattern绑定一个handler

http.createServer(function(req,res) {
    crossroads.parse(req.url);
    res.end('processing');
}).listen(8124);

// This application would match either of the following:
/node/174
/user/3
