var PORT = process.env.PORT || 3000;
var moment = require('moment');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {   
	console.log('User connected via socket.io!');

    // server listens + receives message
    
	socket.on('message', function (message) {
		console.log('Message received: ' + message.text);
        
        // server sends message out to all clients
        message.timestamp = moment().valueOf(); 
		io.emit('message', message); 
	});

    // server sends message upon first message received
    
	socket.emit('message', {
		text: 'Welcome to the chat application!',
        timestamp: moment().valueOf()
	});
});

http.listen(PORT, function () {
	console.log('Server started!');
});



