1: 我们会在server中定义一个function handler 用于server的创建

sockio-server.js & sockio-client.html
1: 我们的server中提供那个handler，他就是一个readFile html的方法，也就是现在我们启动server以后，根据server中监听的port 8000,然后我们'localhost:8000',
也就跟server创建好了链接，然后首先从server中调用socket.emit方法输出{hello : 'world'}信息
2: 在server中的event 'connection'只有我们在敲入'localhost:8000'它才会建立链接，也就是进行响应
