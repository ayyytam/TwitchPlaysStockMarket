module.exports = chatServer;

function chatServer(app) {
  // for chat
  var http = require('http').Server(app);
  var io = require('socket.io')(http);
  var utils = require('./utility.js');
  
  io.on('connection', function(socket) {
    console.log('a user connected');
    socket.on('chat message', function(msg) {
        io.emit('chat message', msg);
        utils.parseMessage(msg);
    });
  });

  console.log('chat server started.');
  return http;
}
