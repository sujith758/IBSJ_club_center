const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);
const PORT = process.env.PORT || 4000;


app.use(express.static('../client'));//what to add here?

const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:4000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

io.on("connection", (socket) => {
  const sessionKey = socket.handshake.query.session;

  if (!sessionKey) {
    socket.disconnect();
    return;
  }

  socket.on("kanban_data_updated", ({ sessionKey, updatedData }) => {
    // Broadcast the updated data to all users in the same session
    io.to(`session-${sessionKey}`).emit("kanban_data_broadcast", updatedData);
    console.log("Emitted broadcasted data:", data);
  });



  socket.join(`session-${sessionKey}`);

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

});


httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
