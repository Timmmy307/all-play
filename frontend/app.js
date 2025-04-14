const socket = io();

// User registration
function register() {
    const username = document.getElementById('username').value;
    socket.emit('register', username);
    alert(`Welcome, ${username}!`);
}

// Play media
function playMedia() {
    const mediaUrl = document.getElementById('mediaUrl').value;
    socket.emit('play-media', mediaUrl);
    alert('Playing media...');
}

socket.on('play-media', (url) => {
    const audio = new Audio(url);
    audio.play();
});

socket.on('mute', () => {
    console.log('You have been muted.');
});
