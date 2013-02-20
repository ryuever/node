var fs = require('fs'),
Step = require('step');
try {
    Step (
	function readData() {
	    console.log('beginning of readdata .');
	    fs.readFile('./data/data2.txt', 'utf8', this);
	    console.log('ending of readdata .');
	},

	function modify(err, text) {
	    if (err) throw err;
	    console.log('before modify');
	    return text.replace(/somecompany\.com/g,'burningbird.net');
	},
	function writeData(err, text) {
	    if (err) throw err;
	    fs.writeFile('./data/data1.txt', text, this);
	}
    );
} catch(err) {
    console.error(err);
}
