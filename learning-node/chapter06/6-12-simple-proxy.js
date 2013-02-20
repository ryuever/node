var http = require('http'),
    httpProxy = require('http-proxy');

httpProxy.createServer(8124, 'localhost').listen(8000);   // 他说redirect的8124必须在下面定义一个相应的server

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('request successfully proxied!' + '\n' + JSON.stringify(req.headers, true,
  							      2));
    res.end();
}).listen(8124);

// 现在我们有两个服务器端口8000和8124,需要注意的就是你想要redirect到的那个端口必须也是一个server.
http://localhost:8000/example.html
下面是输出内容，其中最后面3行'x-forwarded-...' 是代理的信息
request successfully proxied!
{
  "host": "localhost:8000",
  "connection": "keep-alive",
  "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.17 (KHTML, like Gecko) Ubuntu Chromium/24.0.1312.56 Chrome/24.0.1312.56 Safari/537.17",
  "accept-encoding": "gzip,deflate,sdch",
  "accept-language": "en-US,en;q=0.8",
  "accept-charset": "ISO-8859-1,utf-8;q=0.7,*;q=0.3",
  "cookie": "csrftoken=FJ0F5IxsUkg6pMoi493wbKyySmvdTr2V; tracking=s%3Aj%3A%7B%22ct%22%3A4%7D.Y3isQ%2FJkM5RLOBvr6bboFneRntFK7X9zJJ%2BWjGrELZA",
  "x-forwarded-for": "127.0.0.1",
  "x-forwarded-port": "56589",
  "x-forwarded-proto": "http"
}
