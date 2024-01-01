const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = http.createServer(app);

// Enable CORS for all routes
app.use(cors());

// ... other middleware and route configurations ...

const io = new Server(httpServer, {
  cors: {
    origin: 'https://master--aquamarine-bavarois-e12d1e.netlify.app/', // Replace with your React app's domain
    methods: ['GET', 'POST'],
  },
});

// Handle WebSocket connections and other server logic

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  // console.log(`Server is running on http://localhost:${PORT}`);
});
