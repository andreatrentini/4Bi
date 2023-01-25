const express = require('express');
const config = require('./config.js');
const socketio = require('socket.io');

const app = express();

/* app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
}); */

app.use(express.static('public'));

const server = app.listen(config.port, () => {
    console.log('Server in ascolto sulla porta ' + config.port + '...');
})

const io = socketio(server);

var nicknames = [];

io.on('connection', (socketServer) => {
    console.log('Client connesso');
    socketServer.emit('welcome', 'Benvenuto nella chat.');
    
    socketServer.on('register', (nickname) => {
        socketServer.nickname = nickname;
        nicknames.push(nickname);
        console.log('Nickname connesso:', socketServer.nickname);
        socketServer.emit('confirm', 'Registrazione avvenuta con successo. Benvenuto ' + socketServer.nickname);
        socketServer.broadcast.emit('newuser', socketServer.nickname + ' si è unito alla chat.');
        io.emit('nicknames', nicknames);
    })
});