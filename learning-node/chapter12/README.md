
如何进行上传操作：
1: @ryu:~/emacs/emacs-code/node.js$ node chapter12/12-03-upload-pdf-server.js 启动server
2: 敲入'http://localhost:8124/12-02-upload-pdf.html',这个是因为我们设置了connect.static
3: 提交form，让后我们就会受到email
4: 点击email中的链接就会展示那个文件家下的所有项，这个是因为我们设置了connect.directory