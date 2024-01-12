const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;
const { Pool } = require('pg');

const app = express();
const httpServer = http.createServer(app);

app.use(cors());

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Replace with your client's origin
    methods: ["GET", "POST"],
  },
});

const pool = new Pool({
  connectionString: 'postgresql://postgres:sujith98@localhost:5432/ibsj_c_c',
});

// Function to insert accepted file data into PostgreSQL database
const insertAcceptedFile = async (sessionKey, acceptedDocumentName, status) => {
  const client = await pool.connect(); // Acquire a client from the pool

  try {
    await client.query('BEGIN'); // Start a transaction

    // Perform the database insertion
    const queryText = 'INSERT INTO file_status(session_key, file_name, status) VALUES($1, $2, $3)';
    const values = [sessionKey, acceptedDocumentName, status];
    await client.query(queryText, values);

    await client.query('COMMIT'); // Commit the transaction
  }  catch (error) {
    await client.query('ROLLBACK');
    console.error('Error during database insertion:', error);
    throw error;

  } finally {
    client.release(); // Release the client back to the pool
  }
};

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

  socket.on("join_room", (sessionKey) => {
    socket.join(sessionKey);

    if (sessionsDataText[sessionKey]) {
      socket.emit(`recieve_data_text_${sessionKey}`, sessionsDataText[sessionKey]);
    }
    // if (fileName[sessionKey]){
    //   socket.emit(`file_accepted_${sessionKey}`, fileName[sessionKey]);
    // }
  });

  // socket.on("accept_document", ({ sessionKey, documentName }) => {
  //   fileName[sessionKey] = documentName;
  //   console.log(`file_accepted_${sessionKey}: ${documentName}`);
  //   io.to(sessionKey).emit(`file_accepted_${sessionKey}`, { documentName: documentName });
  // });

  socket.on("update_data_text", ({ sessionKey, data }) => {
    sessionsDataText[sessionKey] = data;
    io.to(sessionKey).emit(`recieve_data_text_${sessionKey}`, data);
  });

  // socket.on('reset_files', ({acceptedDocuments, sessionKey}) => {
  //   io.to(sessionKey).emit('files_reset',acceptedDocuments);
  // });

  socket.on("disconnect", () => {
    console.log(`user disconnected: ${socket.id}`);
  });
});

app.post("/insertAcceptedFile", express.json(), async (req, res) => {
  const { sessionKey, acceptedDocumentNameIn } = req.body;

  try {
    // Call the function to insert accepted file data into the PostgreSQL database
    await insertAcceptedFile(sessionKey, acceptedDocumentNameIn, 'Accepted');
    await insertAcceptedFile(sessionKey, acceptedDocumentNameIn, 'Rejected');


    // Send a success response back to the client
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Failed to insert accepted file. Error:", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  } 
});
app.get("/files/:sessionKey/accepted", async (req, res) => {
  const sessionKey = req.params.sessionKey;

  try {
    const client = await pool.connect();
    const result = await client.query(
      'SELECT file_name,status FROM file_status WHERE session_key = $1',
      [sessionKey]
    );

    const acceptedDocumentsDataOut = result.rows.map((row) => ({
      file_name: row.file_name,
      status: row.status,
    }));
    // console.log(`Fetched accepted documents: ${JSON.stringify(acceptedDocumentsDataOut)}`);

    res.json(acceptedDocumentsDataOut);
  } catch (error) {
    console.error("Error fetching accepted documents:", error.message);
    res.status(500).send("Internal Server Error");
  }
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
    await fs.access(filePath);
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
    // Delete files from the file system
    const files = await fs.readdir(folderPath);
    const deletePromises = files.map((file) => {
      const filePath = path.join(folderPath, file);
      return fs.unlink(filePath);
    });

    await Promise.all(deletePromises);

    // Delete records from the database
    const client = await pool.connect();
    await client.query('DELETE FROM file_status WHERE session_key = $1', [sessionKey]);
    client.release();

    res.status(200).send("All files and database records deleted successfully");
  } catch (error) {
    console.error("Error deleting files and records:", error.message);
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


// Start the server
const PORT = 3001;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
