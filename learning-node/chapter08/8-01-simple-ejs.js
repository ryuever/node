var http = require('http'), 
    ejs = require('ejs');
// create http server
http.createServer(function (req, res) {
    res.writeHead(200, {'content-type': 'text/html'});
    // data to render
    var names = ['Joe', 'Mary', 'Sue', 'Mark'];
    var title = 'Testing EJS';
    // render or error
    ejs.renderFile(__dirname + '/views/test.ejs',
		   {title : 'testing', names : names},
		   function(err, result) {
		       if (!err) {
			   res.end(result);
		       } else {
			   res.end('An error occurred accessing page');
			   console.log(err);
		       }
		   });
}).listen(8124);
console.log('Server running on 8124/');

// renderFile接受三个参数，第一个是路径，第二个是要传给它的dict,用于填补ejs中的placeholder,第三个是一个callback function,
// 如果有error就会报出error,否者就将我们处理好得到的html作为一个string,赋值给result,然后返回到response.我们code中的result
// 是用于接受前面ejs+dict的组合的string.
