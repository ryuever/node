
/**
 * Module dependencies.
 */

var express = require('express'),
    map = require('./maproutecontroller'),
    stylus= require('stylus'),
    routes = require('./routes');

console.log('route ',routes);
var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
    app.set('views', __dirname + '/views');
    //app.set('view engine', 'jade');
    app.set('view engine', 'jade');
    app.set('view options', { layout: false });
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
    app.use(stylus.middleware({
	src: __dirname + '/views'
	, dest: __dirname + '/public'
    }));
});

app.configure('development', function(){
    // app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    app.use(express.errorHandler({ dumpExceptions: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

var prefixes = ['widgets'];

// map route to controller
var temp= prefixes.forEach(function(prefix) {
    map.mapRoute(app, prefix);
});

console.log('temp :',temp);

app.listen(3000, function(){
    console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
