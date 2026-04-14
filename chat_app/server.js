const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
// Initialize Socket.io and attach it to the HTTP server
const io = new Server(server);

const PORT = 3000;

// Serve static files (index.html, style.css, script.js) to the browser
app.use(express.static(path.join(__dirname)));

// Socket.io logic for real-time messaging
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Listen for incoming 'chat message' events from any client
    socket.on('chat message', (msgInfo) => {
        // Broadcast the message to EVERYONE connected
        io.emit('chat message', msgInfo);
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(`Chat Server running on port ${PORT}`);
    console.log(`Open http://localhost:${PORT}/index.html in 2 separate browser tabs to test!`);
    console.log(`===============================================`);
});
