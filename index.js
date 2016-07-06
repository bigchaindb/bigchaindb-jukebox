var fs = require('fs');
var http = require('http');

// Serve client side statically
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));

var server = http.createServer(app);

// Start Binary.js server
var BinaryServer = require('binaryjs').BinaryServer;

// link it to express
var bs = BinaryServer({server: server});

// Wait for new user connections
bs.on('connection', function(client){
    var file = fs.createReadStream(__dirname + '/music/audio.ogg');
    var stream = client.createStream();

    // Doesn't send correct streams yet
    file.pipe(stream);
});

server.listen(9000);
console.log('HTTP and BinaryJS server started on port 9000');
