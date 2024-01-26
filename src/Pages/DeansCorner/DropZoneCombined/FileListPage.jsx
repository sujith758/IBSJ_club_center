// FileListPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import "./FileListPage.css";

const FileListPage = ({ socketForFiles }) => {
  const { sessionKey } = useParams();
  const [files, setFiles] = useState([]);
  const [acceptedDocuments, setAcceptedDocuments] = useState(
    JSON.parse(localStorage.getItem(`acceptedDocuments_${sessionKey}`)) || []
  );

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
    try {
      // Check if the file is already accepted
      if (acceptedDocuments.includes(file.name)) {
        console.log(`File '${file.name}' is already accepted.`);
        return; // Don't proceed further if the file is already accepted
      }
  
      // Emit the event to the server after the state is updated
  
      // Insert data into PostgreSQL database
      console.log('Inserting accepted file into the database...');
      console.log('Session key:', sessionKey);
      console.log('File name:', file.name);
  
      // Update the state to mark the file as accepted
      setAcceptedDocuments((prevAccepted) => [...prevAccepted, file.name]);
  
      // Save updatedDocuments to local storage using the updated state directly
      localStorage.setItem(`acceptedDocuments_${sessionKey}`, JSON.stringify([...acceptedDocuments, file.name]));
  
      // Perform the actual insertion with 'Accepted' as the status
      await insertAcceptedFile(sessionKey, file.name, 'Accepted');
    } catch (error) {
      console.error('Error during file acceptance:', error.message);
    }
  };
  
  const handleReject = async (file) => {
    try {
      // Check if the file is already accepted
      if (acceptedDocuments.includes(file.name)) {
        console.log(`File '${file.name}' is already accepted, so it won't be rejected.`);
        return; // Don't proceed further if the file is already accepted
      }
  
      // Assuming you have a server endpoint to delete the file
      const deleteResponse = await fetch(`http://localhost:3001/deleteFile/${sessionKey}/${file.name}`, {
        method: 'DELETE',
      });
  
      if (!deleteResponse.ok) {
        throw new Error(`Failed to delete file. Status: ${deleteResponse.status}`);
      }
  
      console.log(`Rejected and deleted: ${file.name}`);
  
      // Update the state to remove the rejected file
      setFiles((prevFiles) => prevFiles.filter((prevFile) => prevFile.name !== file.name));
  
      // Perform the actual insertion with 'Rejected' as the status
      await insertAcceptedFile(sessionKey, file.name, 'Rejected');
    } catch (error) {
      console.error('Error during file rejection:', error.message);
    }
  };
  return (
    <div className='file-list-page'>
      <h2>{sessionKey}</h2>
      <ul className='file-list-content-ul'>
        {files.map((file) => (
          <li className="file-list-content-li" key={file.name}>
            <div className='file-name'>{file.name}</div>
            <div className='button-upload'>
            <button className="view-button-dc" onClick={() => openFile(file)}>View</button>
            {acceptedDocuments.includes(file.name) ? (
              <p style={{fontSize: "1.2rem", fontWeight: "500"}}>Accepted</p>
            ) : (
              <>
                <button className="accept-button-dc" onClick={() => handleAccept(file)}>Accept</button>
                <button className="reject-button-dc" onClick={() => handleReject(file)}>Reject</button>
              </>
              
            )}
            </div>
           
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileListPage;
