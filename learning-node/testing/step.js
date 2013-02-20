var fs = require('fs'),
    Step = require('step'),
    files,
    _dir = './data/';
try {
    Step (
	function readDir() {
	    fs.readdir(_dir, this);
	},
	function readFile(err, results) {
	    if (err) throw err;
	    files = results;
	    var group = this.group();
	    results.forEach(function(name) {
		fs.readFile(_dir + name, 'utf8', group());
	    });
	},
	function writeAll(err, data) {
	    if (err) throw err;
	    for (var i = 0; i < files.length; i++) {
		console.log("beginning of writeALL ", i);
		var adjdata = data[i].replace(/somecompany\.com/g,'burningbird.net');
		fs.writeFile(_dir + files[i], adjdata, 'utf8',this);
		console.log("ending of writeALL ", i);
	    }
	}
    );
} catch(err) {
    console.log(err);
}


Step(
  function readDir() {
    fs.readdir(__dirname, this);
  },
  function readFiles(err, results) {
    if (err) throw err;
    // Create a new group
    var group = this.group();
    results.forEach(function (filename) {
      if (/\.js$/.test(filename)) {
        fs.readFile(__dirname + "/" + filename, 'utf8', group());
      }
    });
  },
  function showAll(err , files) {
    if (err) throw err;
    console.dir(files);
  }
);
