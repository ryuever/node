var app = require('http').createServer(handler), 
    io = require('socket.io').listen(app), 
    fs = require('fs');
app.listen(8124);
function handler (req, res) {
    fs.readFile(__dirname + '/13-04-chat-client.html',
		function (err, data) {
		    if (err) {
			res.writeHead(500);
			return res.end('Error loading chat.html');
		    }
		    res.writeHead(200);
		    res.end(data);
		});
}

io.sockets.on('connection', function (socket) {
    socket.on('addme',function(username) {
	socket.username = username;
	// 返回给client,提示它已经连接了
	socket.emit('chat', 'SERVER', 'You have connected');
	// 通过一个广播的形式提示其它的client,不包括自己在内（那个发送'addme'的client）
	socket.broadcast.emit('chat', 'SERVER', username + ' is on deck');
    });
    socket.on('sendchat', function(data) {
	// 通过一个广播的形式提示所有的client.
	io.sockets.emit('chat', socket.username, data);
    });
    socket.on('disconnect', function() {
	io.sockets.emit('chat', 'SERVER', socket.username + ' has left the building');
    });
});
