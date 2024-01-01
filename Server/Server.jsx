const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Listen for incoming socket connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for local storage updates
  socket.on('updateLocalStorage', (updatedData) => {
    // Broadcast the updated data to all connected clients
    io.emit('update', updatedData);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
