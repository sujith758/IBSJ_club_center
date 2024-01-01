const express = require('express');
const https = require('https');
const { Server } = require('socket.io');

const app = express();
const httpsServer = https.createServer(app);

// ... other Express configurations ...

// Add the CORS configuration for Socket.IO
const io = new Server(httpsServer, {
  cors: {
    origin: 'https://master--aquamarine-bavarois-e12d1e.netlify.app/',
    methods: ['GET', 'POST'],
  },
});

// Handle WebSocket connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle other WebSocket events here...

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the HTTP server
const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  // console.log(`Server is running on http://localhost:${PORT}`);
});
