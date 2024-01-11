// Import necessary modules
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;

const app = express();
const httpServer = http.createServer(app);

app.use(cors());

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Replace with your client's origin
    methods: ["GET", "POST"],
  },
});


// Multer setup for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const sessionKey = req.headers.sessionkey;
    if (!sessionKey) {
      return cb(new Error("Session key not provided"));
    }
    const folderPath = path.join(__dirname, "public", sessionKey);
    cb(null, folderPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Store session-specific data in rooms
const sessionsDataText = {};
const fileName = {};

io.on("connection", (socket) => {
  console.log(`user connected: ${socket.id}`);

  // Handle joining a room based on sessionKey
  socket.on("join_room", (sessionKey) => {
    socket.join(sessionKey);

    // Check for existing text data and emit to the newly joined room
    if (sessionsDataText[sessionKey]) {
      socket.emit(`recieve_data_text_${sessionKey}`, sessionsDataText[sessionKey]);
    }
    if (fileName[sessionKey]){
      socket.emit(`file_accepted_${sessionKey}`, fileName[sessionKey]);
    }

    // Handle accepting a file in the join room event(file accept)
    
  });
  socket.on("accept_document", ({ sessionKey, documentName }) => {
    fileName[sessionKey] = documentName;
    console.log(`file_accepted_${sessionKey}: ${documentName}`);
    io.to(sessionKey).emit(`file_accepted_${sessionKey}`, { documentName: documentName });
  
  });
  // Handle updating text data for a session(Kanban)
  socket.on("update_data_text", ({ sessionKey, data }) => {
    sessionsDataText[sessionKey] = data;
    io.to(sessionKey).emit(`recieve_data_text_${sessionKey}`, data);
  });

  socket.on("disconnect", () => {
    console.log(`user disconnected: ${socket.id}`);
  });
});

// Multer for file upload
app.post("/upload", upload.array("files"), async (req, res) => {
  const sessionKey = req.headers.sessionkey;
  const uploadedFiles = req.files.map((file) => ({
    name: file.originalname,
    size: file.size,
  }));
  res.send("Files uploaded successfully");
});

app.delete("/deleteFile/:sessionKey/:fileName", async (req, res) => {
  const { sessionKey, fileName } = req.params;
  const filePath = path.join(__dirname, "public", sessionKey, fileName);

  try {
    await fs.unlink(filePath);
    res.status(200).send("File deleted successfully");
  } catch (error) {
    console.error("Error deleting file:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/deleteFiles/:sessionKey", async (req, res) => {
  const sessionKey = req.params.sessionKey;
  const folderPath = path.join(__dirname, "public", sessionKey);

  try {
    // Delete all files in the session folder
    const files = await fs.readdir(folderPath);
    const deletePromises = files.map((file) => {
      const filePath = path.join(folderPath, file);
      return fs.unlink(filePath);
    });

    await Promise.all(deletePromises);

    // Respond with success message
    res.status(200).send("All files deleted successfully");
  } catch (error) {
    console.error("Error deleting files:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/files/:sessionKey", async (req, res) => {
  const sessionKey = req.params.sessionKey;
  const folderPath = path.join(__dirname, "public", sessionKey);

  try {
    const files = await fs.readdir(folderPath);
    const fileDetails = files.map((file) => ({
      name: file,
      path: path.join("/public", sessionKey, file),
    }));
    res.json(fileDetails);
  } catch (error) {
    console.error("Error fetching files:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.use("/public", express.static(path.join(__dirname, "public")));


const PORT = 3001;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

