// FileListPage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const FileListPage = ({ socketForFiles }) => {
  const { sessionKey } = useParams();
  const [files, setFiles] = useState([]);
  const socket = socketForFiles;

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        if (!sessionKey) {
          console.error("Session key is undefined.");
          return;
        }

        const response = await fetch(
          `http://localhost:3001/files/${sessionKey}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch files. Status: ${response.status}`);
        }

        const fetchedFiles = await response.json();
        setFiles(fetchedFiles);
      } catch (error) {
        console.error("Error during file fetch:", error.message);
      }
    };

    fetchFiles();
  }, [sessionKey]);

  const openFile = (file) => {
    window.open(
      `http://localhost:3001/public/${sessionKey}/${file.name}`,
      "_blank"
    );
  };

  const handleAccept = (file) => {
    // Logic for accepting the file
    console.log(`Accepted: ${file.name}`);
  
    // Add a log here to check what is being emitted
    console.log('Emitting accept_document event:', { sessionKey, documentName: file.name });
  
    // Emit the event to the server
    socket.emit('accept_document', { sessionKey, documentName: file.name });
  };
  

  const handleReject = async (file) => {
    try {
      // Assuming you have a server endpoint to delete the file
      const deleteResponse = await fetch(
        `http://localhost:3001/deleteFile/${sessionKey}/${file.name}`,
        {
          method: "DELETE",
        }
      );

      if (!deleteResponse.ok) {
        throw new Error(
          `Failed to delete file. Status: ${deleteResponse.status}`
        );
      }

      console.log(`Rejected and deleted: ${file.name}`);

      // Update the state to remove the rejected file
      setFiles((prevFiles) =>
        prevFiles.filter((prevFile) => prevFile.name !== file.name)
      );
    } catch (error) {
      console.error("Error during file deletion:", error.message);
    }
  };

  return (
    <div>
      <h2>Files for Session Key: {sessionKey}</h2>
      <ul>
        {files.map((file) => (
          <li key={file.name}>
            {file.name}
            <button onClick={() => openFile(file)}>View</button>
            <button onClick={() => handleAccept(file)}>Accept</button>
            <button onClick={() => handleReject(file)}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileListPage;
