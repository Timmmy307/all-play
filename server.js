const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static frontend files
app.use(express.static('frontend'));

const PORT = 3000; // Change to 80 if required
let users = {};

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // User registration
    socket.on('register', (username) => {
        users[socket.id] = { username, points: 0 };
        console.log(`${username} registered.`);
    });

    // Play media request
    socket.on('play-media', (mediaUrl) => {
        io.emit('play-media', mediaUrl);
    });

    // Mute user request
    socket.on('mute-user', (userId) => {
        io.to(userId).emit('mute');
    });

    socket.on('disconnect', () => {
        delete users[socket.id];
        console.log(`User disconnected: ${socket.id}`);
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
