var fs = require('fs');
var writeStream = fs.createWriteStream('./log.txt',
    		       {'flags' : 'a',
					'encoding' : 'utf8',
					'mode' : 0666});
var counter = 0;                                       // used for indentify the finish of modify.
try {
    // get list of files
    fs.readdir('./data/', function(err, files) {
	// for each file
	files.forEach(function(name) {
	    // modify contents
	    console.log(name);      // newly added
	    fs.readFile('./data/' + name,'utf8', function(err,data) {
		if (err) throw err;
		console.log('first come : ' + name);    // newly added
		var adjData = data.replace(/somecompany\.com/g,'burningbird.net');
		// write to file
		fs.writeFile('./data/' + name, adjData, function(err) {
		    if (err) throw err;
		    // log write
		    writeStream.write('changed : ' + name + '\n', 'utf8', function(err) {
			if(err) throw err;
			console.log('finished : ' + name);   //newly added
			counter++;
			if (counter >= files.length)
			    console.log('all done');         // checking the finish of modify..
		    });
		});
	    });
	});
	console.log('all finished');
    });
} catch(err) {
    console.error(util.inspect(err));
}

// in log.txt
changed : data5.txt
changed : data4.txt
changed : data3.txt
changed : 1.txt
changed : data2.txt

// on console 
data3.txt
1.txt
data5.txt
data2.txt
data4.txt
all finished
first come : data5.txt
first come : data3.txt
first come : data4.txt
first come : 1.txt
first come : data2.txt
finished : data5.txt
finished : data4.txt
finished : data3.txt
finished : 1.txt
finished : data2.txt
all done
