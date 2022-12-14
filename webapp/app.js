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

io.on('connection', (socket) => {
    console.log('Client connesso');
    socket.emit('welcome', 'Benvenuto nella chat.');
    
    socket.on('register', (nickname) => {
        socket.nickname = nickname;
        console.log('Nickname connesso:', socket.nickname);
        socket.emit('confirm', 'Registrazione avvenuta con successo. Benvenuto ' + socket.nickname);
    })
});