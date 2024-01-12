// FileListPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

const FileListPage = ({ socketForFiles }) => {
  const { sessionKey } = useParams();
  const [files, setFiles] = useState([]);
  const [acceptedDocuments, setAcceptedDocuments] = useState(
    JSON.parse(localStorage.getItem(`acceptedDocuments_${sessionKey}`)) || []
  );
  const socket = io.connect('http://localhost:3001');

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        if (!sessionKey) {
          console.error('Session key is undefined.');
          return;
        }

        const response = await fetch(`http://localhost:3001/files/${sessionKey}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch files. Status: ${response.status}`);
        }

        const fetchedFiles = await response.json();
        setFiles(fetchedFiles);
      } catch (error) {
        console.error('Error during file fetch:', error.message);
      }
    };

    fetchFiles();
  }, [sessionKey]);

  const openFile = (file) => {
    window.open(`http://localhost:3001/public/${sessionKey}/${file.name}`, '_blank');
  };

  const insertAcceptedFile = async (sessionKey, acceptedDocumentNameIn, status) => {
    try {
      const response = await fetch('http://localhost:3001/insertAcceptedFile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionKey, acceptedDocumentNameIn, status }),
      });

      if (!response.ok) {
        throw new Error(`Failed to insert accepted file. Status: ${response.status}`);
      }

      // Success message
      console.log(`File accepted and inserted into the database: ${acceptedDocumentNameIn}`);
    } catch (error) {
      throw new Error(`Failed to insert accepted file: ${error.message}`);
    }
  };

 

  const handleAccept = async (file) => {
    // Emit the event to the server after the state is updated
    socket.emit('accept_document', { sessionKey, documentName: file.name });
  
    try {
      // Insert data into PostgreSQL database
      console.log('Inserting accepted file into the database...');
      console.log('Session key:', sessionKey);
      console.log('File name:', file.name);
      await insertAcceptedFile(sessionKey, file.name, 'Accepted');
  
      // Update the state to mark the file as accepted
      setAcceptedDocuments((prevAccepted) => [...prevAccepted, file.name]);
  
      // Save updatedDocuments to local storage
      localStorage.setItem(`acceptedDocuments_${sessionKey}`, JSON.stringify([...acceptedDocuments, file.name]));
    } catch (error) {
      console.error('Error during file acceptance:', error.message);
    }
  };
  
  

  const handleReject = async (file) => {
    try {
      // Assuming you have a server endpoint to delete the file
      const deleteResponse = await fetch(`http://localhost:3001/deleteFile/${sessionKey}/${file.name}`, {
        method: 'DELETE',
      });

      if (!deleteResponse.ok) {
        throw new Error(`Failed to delete file. Status: ${deleteResponse.status}`);
      }

      console.log(`Rejected and deleted: ${file.name}`);
      await insertAcceptedFile(sessionKey, file.name, 'Rejected');


      // Update the state to remove the rejected file
      setFiles((prevFiles) => prevFiles.filter((prevFile) => prevFile.name !== file.name));
    } catch (error) {
      console.error('Error during file deletion:', error.message);
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
            {acceptedDocuments.includes(file.name) ? (
              <p>Accepted</p>
            ) : (
              <>
                <button onClick={() => handleAccept(file)}>Accept</button>
                <button onClick={() => handleReject(file)}>Reject</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileListPage;
