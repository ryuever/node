// app.js
var express = require('express'),
    map = require('./maproutecontroller'),
    routes = require('./routes');

app.get('/', routes.index);
var prefixes = ['widgets'];           //指定prefix,通过forEach将每一个值传到router里面
// map route to controller
var temp= prefixes.forEach(function(prefix) {
    map.mapRoute(app, prefix);
});

// route.index
exports.index = function(req, res){
   res.render('index', { title: 'Express' })
};

// maproutecontroller.js
exports.mapRoute = function(app, prefix) {
    console.log('fist ',prefix);     // testing, the value will be 'widgets'
    prefix = '/' + prefix;
    console.log('prefix', prefix);
    var prefixObj = require('./controllers/' + prefix); // testing, 其形式是require('./controllers//widgets')
    console.log('prefixObj :', prefixObj);    // testing, 会输出显示你导入的函数

    app.get(prefix, prefixObj.index);
    app.get(prefix + '/new', prefixObj.new);
    app.get(prefix + '/:id', prefixObj.show);
    app.post(prefix + '/create', prefixObj.create);
    app.get(prefix + '/:id/edit', prefixObj.edit);
    app.put(prefix + '/:id', prefixObj.update);
    app.del(prefix + '/:id', prefixObj.destroy);
};

// 你应该注意到我们的prefixObj后的require中是对了一个斜杠的，这个对我们引入函数无所谓，仍旧能够找到，但是如果我们不在前面
// 加这么一个斜杠，当我们发来request它会找不到可以匹配的，比如我们get是形式'widgets/new'而不是'/widgets/new'.
// 1:我们在app.js中定义的prefixes,相当于我们router的第一个分水岭，比如现在我们有另一个对象widgets2,那么这个时候它的值
//   就是['widgets','widgets2'],但是如果基本函数名不变的话，我们的maproutecontroller.js也就不需要改变，因为它会根据
//   不同的prefix,关联到不同的函数，继而在函数中render不同的template file.
// 2:注意方法的来源，比如我们上面index的方法就是来自response对象，所以它不会根据template的不同让我们重写。
