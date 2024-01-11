// BusinessSquad.jsx
import React, { useState, useEffect } from 'react';
import NavbarBS from './NavbarBS';

const BusinessSquad = ({ socketForFiles, sessionKey }) => {
  const [acceptedDocuments, setAcceptedDocuments] = useState(
    JSON.parse(localStorage.getItem(`acceptedDocuments_${sessionKey}`)) || []
  );

  useEffect(() => {
    const socket = socketForFiles;

    console.log('Current sessionKey:', sessionKey);
    console.log('Current acceptedDocuments state:', acceptedDocuments);

    if (!socket.connected) {
      socket.connect();
      console.log('Reconnecting to socket server.');
    }

    socket.on('connect', () => {
      console.log('Connected to socket server.');
    });

    socket.emit('join_room', sessionKey);

    socket.on(`file_accepted_${sessionKey}`, (data) => {
      console.log(`Received file_accepted event:`, data);

      const documentName = data && data.documentName;

      if (documentName && !acceptedDocuments.includes(documentName)) {
        setAcceptedDocuments((prevAccepted) => {
          const updatedDocuments = [...prevAccepted, documentName];

          // Save updatedDocuments to local storage
          localStorage.setItem(`acceptedDocuments_${sessionKey}`, JSON.stringify(updatedDocuments));

          return updatedDocuments;
        });
      }
    });

    return () => {
      console.log('Cleaning up socket connection.');
      socket.off(`file_accepted_${sessionKey}`);
      socket.off('connect');

      if (!socket.connected) {
        socket.disconnect();
        console.log('Socket disconnected.');
      }
    };
  }, [socketForFiles, sessionKey, acceptedDocuments]);

  const handleReset = () => {
    // Clear local storage
    localStorage.removeItem(`acceptedDocuments_${sessionKey}`);
    // Clear state
    setAcceptedDocuments([]);
    socketForFiles.emit('delete_all_files', { sessionKey });
    fetch(`http://localhost:3001/deleteFiles/${sessionKey}`, {
      method: 'POST',
    })
      .then(response => response.text())
      .then(message => console.log(message))
      .catch(error => console.error('Error deleting files:', error));
  };

  return (
    <div>
      <NavbarBS onReset={handleReset}/>

      <h2>Accepted Documents:</h2>
      <ul>
        {acceptedDocuments.map((documentName, index) => (
          <li key={index}>{documentName}</li>
        ))}
      </ul>
    </div>
  );
};

export default BusinessSquad;
