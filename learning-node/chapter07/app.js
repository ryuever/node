var express = require('express'), 
    http = require('http');

var app = module.exports = express.createServer();
app.configure(function(){
});

app.get(/^\/node?(?:\/(\d+)(?:\.\.(\d+))?)?/, function(req, res){
    console.log(req.params);
    res.send(req.params);
});

app.get('/content/*',function(req,res) {
    res.send(req.params);
});

app.get("/products/:id/:operation?", function(req,res) {
    console.log(req);
    res.send(req.params.operation + ' ' + req.params.id + 'test');
});

app.get(/^\/test\/(?:([^\/]+?))\/(?:([^\/]+?))\/?$/i, function(req,res) {
    console.log(req);
    res.send(req.params);
});

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});


// /^\/products\/(?:([^\/]+?))\/(?:([^\/]+?))\/?$/i,
// /^\/products\/(?:([^\/]+?))(?:\/([^\/]+?))?\/?$/i, 有问好

