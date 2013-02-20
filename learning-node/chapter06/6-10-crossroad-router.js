var crossroads = require('crossroads'),
http = require('http');
crossroads.addRoute('/category/{type}/:pub:/:id:', function(type,pub,id) {
    if (!id && !pub) {
  console.log('Accessing all entries of category ' + type);
  return;
    } else if (!id) {
	console.log('Accessing all entries of category ' + type +
		    ' and pub ' + pub);
	return;
    } else {
	console.log('Accessing item ' + id + ' of pub ' + pub +
		    ' of category ' + type);
    }
});
http.createServer(function(req,res) {
    crossroads.parse(req.url);
    res.end('and that\'s all\n');
}).listen(8124);

//因为addRoute就是一个pattern listener,既然是pattern的话，也就是定义一些模式用于跟你发来的请求URL进行匹配
//Listener 也就是后面会有一个callback函数进行匹配之后的下一步操作。
// {} 指示变量，你只要是一个string之类的都可以匹配到
// ::表示option,可有可无
// 6-11 是另一种实现route的方式
The following requests:
http://examples.burningbird.net:8124/category/history
http://examples.burningbird.net:8124/category/history/journal
http://examples.burningbird.net:8124/category/history/journal/174
Generate the following console messages:
Accessing all entries of category history
Accessing all entries of category history and pub journal
Accessing item 174 of pub journal of category history
