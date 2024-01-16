// BusinessSquad.jsx
import React, { useState, useEffect } from 'react';
import NavbarG from './NavbarG';

const Graffiti = ({ sessionKey }) => {
  const [acceptedDocuments, setAcceptedDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleReset = () => {
    setAcceptedDocuments([]);
    localStorage.removeItem(`acceptedDocuments_${sessionKey}`);

    fetch(`http://localhost:3001/deleteFiles/${sessionKey}`, {
      method: 'POST',
    })
      .then(response => response.text())
      .then(message => console.log(message))
      .catch(error => console.error('Error deleting files:', error));
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem(`acceptedDocuments_${sessionKey}`));
    if (storedData) {
      setAcceptedDocuments(storedData);
      setIsLoading(false);
    }
  }, [sessionKey]);

  useEffect(() => {
    const fetchAcceptedDocuments = async () => {
      try {
        const response = await fetch(`http://localhost:3001/files/${sessionKey}/accepted`);
        if (!response.ok) {
          throw new Error(`Failed to fetch accepted documents. Status: ${response.status}`);
        }

        const acceptedDocumentsDataOut = await response.json();
        setAcceptedDocuments(acceptedDocumentsDataOut);
        localStorage.setItem(`acceptedDocuments_${sessionKey}`, JSON.stringify(acceptedDocumentsDataOut));
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching accepted documents:', error.message);
      }
    };

    fetchAcceptedDocuments();
  }, [sessionKey]);

  return (
    <div>
      <NavbarG onReset={handleReset} />

      <h2>Accepted Documents:</h2>
      {isLoading ? (
        <p>No files</p>
      ) : (
        <ul>
          {acceptedDocuments.map((document, index) => (
            <li key={index}>
              <p>Name: {document.file_name}</p>
              <p>Status: {document.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Graffiti;
