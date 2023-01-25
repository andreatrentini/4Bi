var socketClient = io();

socketClient.on('welcome', (msg) => {
    let paragrafo = document.getElementById('messaggi');
    paragrafo.innerText = msg;
});

socketClient.on('confirm', (msg) => {
    let registration = document.getElementById('registration');
    registration.innerText = msg;
});

socketClient.on('newuser', (msg) => { 
    let paragrafo = document.getElementById('messaggi');
    paragrafo.innerText = msg;
});

socketClient.on('nicknames', (nicknames) => {
    let lista = document.getElementById('nicknames');
    lista.innerHTML = '';
    for (let i = 0; i < nicknames.length; i++) {
        let nickname = nicknames[i];
        let item = document.createElement('li');
        item.innerText = nickname;
        lista.appendChild(item);
    }
});

function register() {
    let nickname = document.getElementById('nickname').value;
    if (nickname) {
        socketClient.emit('register', nickname);
    }
}