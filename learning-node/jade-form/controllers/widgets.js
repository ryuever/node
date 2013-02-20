var widgets = [
    { id : 1,
      name : "The Great Widget",
      price : 1000.00
    }
]
// index listing of widgets at /widgets/
// exports.index = function(req, res) {
//     res.send(widgets);
// };

// index listing of widgets at /widgets/
exports.index = function(req, res) {
    console.log('widget :',widgets);
    res.render('widgets/index', {title : 'Widgets', widgets : widgets});
};


// display new widget form
// exports.new = function(req, res) {
//     res.send('displaying new widget form');
// };
// 你不能直接将'/../public/widgets/new.html'写到sendfile中，因为它碰到..会报错的。并且我们在这里引用的是一个html
// 整个的作用是当碰见'localhost:3000/new' 然后就将new.html发送到页面上。
exports.new = function(req, res) {
    var filePath = require('path').normalize(__dirname +
					     "/../public/widgets/new.html");
    res.sendfile(filePath);
};

// add a widget
exports.create = function(req, res) {
    var indx = widgets.length + 1;
    widgets[widgets.length] =
	{ id : indx,
	  name : req.body.widgetname,
	  price : parseFloat(req.body.widgetprice),
	  desc : req.body.widgetdesc}
    console.log('new added :' ,widgets[indx-1]);
   // res.send('Widget ' + req.body.widgetname + ' added with id ' + indx);
    res.render('widgets/added', {title: 'Widget Added', widget : widgets[indx-1]});
};

// show a widget
// exports.show = function(req, res) {
//     var indx = parseInt(req.params.id) - 1;
//     if (!widgets[indx])
// 	res.send('There is no widget with id of ' + req.params.id);
//     else
// 	res.send(widgets[indx]);
// };
// show a widget
exports.show = function(req, res) {
    var indx = parseInt(req.params.id) - 1;
    if (!widgets[indx])
	res.send('There is no widget with id of ' + req.params.id);
    else
	res.render('widgets/show', {title : 'Show Widget', widget : widgets[indx]});
};

// delete a widget
// exports.destroy = function(req, res) {
//     var indx = req.params.id - 1;
//     delete widgets[indx];
// console.log('deleted ' + req.params.id);
// res.send('deleted ' + req.params.id);
// };

exports.destroy = function(req, res) {
    var indx = req.params.id - 1;
    delete widgets[indx];
    console.log('deleted ' + req.params.id);
    res.send('deleted ' + req.params.id);
};

// display edit form
// exports.edit = function(req, res) {
//     res.send('displaying edit form');
// };

// display edit form
exports.edit = function(req, res) {
    var indx = parseInt(req.params.id) - 1;
    res.render('widgets/edit', {title : 'Edit Widget', widget : widgets[indx]});
};

// update a widget
// exports.update = function(req, res) {
//     var indx = parseInt(req.params.id) - 1;
//     widgets[indx] =
// 	{ id : indx,
// 	  name : req.body.widgetname,
// 	  price : parseFloat(req.body.widgetprice)}
//     console.log(widgets[indx]);
//     res.send ('Updated ' + req.params.id);
// };

// update a widget
exports.update = function(req, res) {
    var indx = parseInt(req.params.id) - 1;
    widgets[indx] =
	{ id : indx + 1,
	  name : req.body.widgetname,
	  price : parseFloat(req.body.widgetprice),
	  desc : req.body.widgetdesc}
    console.log(widgets[indx]);
    res.render('widgets/added', {title: 'Widget Edited', widget : widgets[indx]})
};

// 因为render方法是在被调用的函数中的，比如现在我们的请求是'localhost:3000/1' 它将会调用show function, 然后它会调用
// show()中的render方法。把后面的值连同第一个参数所指的file编译好以后发送给页面。也就是render控制的是匹配请求发过来
// 做出的反应，具体你点击页面的按钮或链接往哪走就是页面中的设置问题了，render里的value,也必须是在请求发送到以后，执
// 行render之前已经求出来的，否则你让我们怎么显示？...
