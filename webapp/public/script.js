var socket = io();

socket.on('welcome', (msg) => {
    let paragrafo = document.getElementById('messaggi');
    paragrafo.innerText = msg;
});

socket.on('confirm', (msg) => {
    let registration = document.getElementById('registration');
    registration.innerText = msg;
});

function register() {
    let nickname = document.getElementById('nickname').value;
    if (nickname) {
        socket.emit('register', nickname);
    }
}