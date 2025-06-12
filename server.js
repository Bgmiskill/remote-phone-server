const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: '*' }
});

io.on('connection', socket => {
    console.log('Client connected:', socket.id);

    socket.on('frame', data => {
        socket.broadcast.emit('frame', data);
    });

    socket.on('input', data => {
        socket.broadcast.emit('input', data);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});
