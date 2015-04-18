var socket = io();

// Handle sending messages
$('#chat-window form').submit(function() {
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
});

//Handle receiving messages
socket.on('chat message', function(msg) {
    $('#messages').append($('<li>').text(msg));
});