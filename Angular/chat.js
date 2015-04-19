/*var socket = io();

// Handle sending messages
$('#chat-window form').submit(function() {
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
});

// Handle receiving messages
socket.on('chat message', function(msg) {
    $('#messages').append($('<li>').text(msg));
});

// Handle receiving market data
socket.on('portfolio data', function(msg) {
    slug = JSON.parse(msg);
    console.log(slug);
});
*/