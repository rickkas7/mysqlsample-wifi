// Run this like:
// node mysqlwifi.js
//
// Requires the following additional packages. From the directory containing mysqlsample.js, run:
// npm install mysql
//
// You must configure the authentication information for the MySQL in the
// config.js file in the directory where this  

// Test database definition:
// CREATE TABLE test1(id INT NOT NULL AUTO_INCREMENT, a INT, PRIMARY KEY(id))

// You will need to customize the settings in the config.js file!
var config = require('./config.js');

// https://github.com/mysqljs/mysql
var mysql = require('mysql');

var net = require('net');

var dataPort = 7123;

// Make database connection
console.log("starting database connection");
var connection = mysql.createConnection(config.mysql);
connection.connect();
	

// Start a TCP Server. This is what receives data from the Particle Photon
// https://gist.github.com/creationix/707146
net.createServer(function (socket) {
	console.log('data connection started from ' + socket.remoteAddress);
	
	// The server sends a 8-bit byte value for each sample. Javascript doesn't really like
	// binary values, so we use setEncoding to read each byte of a data as 2 hex digits instead.
	socket.setEncoding('utf8');
	
	socket.on('data', function (data) {
		// We received data on this connection. Send it to all of the SSE clients.
		// console.log('data ' + data);
		
		var array = data.split("\n");
		for(var ii = 0; ii < array.length; ii++) {
			if (array[ii] != '') {
				// console.log("parsing ii=" + ii + " data=" + array[ii]);
				storeData(JSON.parse(array[ii]));
			}
		}
	});
	socket.on('end', function () {
		console.log('data connection ended');
	});
}).listen(dataPort);


function storeData(data) {
	console.log("storeData", data);
	
	connection.query('INSERT INTO test1 SET ?', {'a': data.a}, function(err, result) {
		if (err) throw err;

		console.log("id=" + result.insertId);
	});
}
