var fs = require('fs');
var spawn = require('child_process').spawn;
// var emailjs = require('emailjs');
var emailjs =require('emailjs/email');
module.exports.processFile = function(username, email, path, filename) {
    // first, create user directory if doesn't exist
    fs.mkdir(__dirname + '/public/ryu/' + username, function(err) {
	// next create file directory if doesn't exist
	var dt = Date.now();
	// url for message later
	var url = 'http://localhost:8124/ryu/' +
		username + '/' + dt + filename;
	// directory for file
	var dir = __dirname + '/public/ryu/' + username + '/' +
		dt + filename;
	fs.mkdir(dir, function(err) {
	    if (err)
		return console.log(err);
	    // now, rename file to new location
	    var newfile = dir + '/' + filename;
	    fs.rename(path, newfile, function(err) {
		if (err)
		    return console.log(err);
		//burst pdf
		var pdftk = spawn('pdftk', [newfile, 'burst', 'output',
					    dir + '/page_%02d.pdf' ]);
		pdftk.on('exit', function (code) {
		    console.log('child process ended with ' + code);
		    if (code != 0)
			return;
		    console.log('sending email');
		    var server = emailjs.server.connect({
			user : 'liuyouchao111@gmail.com',
			password : '********',
			host : 'smtp.gmail.com',
			port : 587,
			tls : true
		    });
		    var headers = {
			text : 'You can find your split PDF at ' + url,
			from : 'youremail',
			to : email,
			subject: 'split pdf'
		    };
		    var message = emailjs.message.create(headers);
		    message.attach({data:"<p>You can find your split PDF at " +
				    "<a href='" + url + "'>" + url + "</a></p>",
				    alternative: true});
		    server.send(message, function(err, message) {
			console.log(err || message);
		    });
		    pdftk.kill();
		});
		pdftk.stderr.on('data', function (data) {
		    console.log('stderr: ' + data);
		});
	    });
		     });
		});
	    };
