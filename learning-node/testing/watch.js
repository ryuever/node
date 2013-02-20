var fs = require('fs');
console.log('init starting ...');
var config = JSON.parse(fs.readFileSync('./files/config.json'));
console.log('config : ', config);

fs.watchFile('./files/config.json',function(curr,prev){
    console.log('config is changed');
    var config = JSON.parse(fs.readFileSync('./files/config.json'));
    console.log('config : ', config);
});
