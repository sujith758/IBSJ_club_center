// BusinessSquad.jsx
import React, { useState, useEffect } from "react";
import NavbarBS from "./NavbarBS";
import "./BusinessSquad.css";
import { Link } from "react-router-dom";

const BusinessSquad = ({ socketForFiles, sessionKey }) => {
  const [acceptedDocuments, setAcceptedDocuments] = useState([]);

  const handleReset = async () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset and delete all accepted documents?"
    );

    if (confirmReset) {
      try {
        // Delete files from the server
        const deleteResponse = await fetch(`http://localhost:3001/deleteFiles/${sessionKey}`, {
          method: "POST",
        });

        if (!deleteResponse.ok) {
          throw new Error(`Failed to delete files. Status: ${deleteResponse.status}`);
        }

        // Update local state and remove stored data
        setAcceptedDocuments([]);
        localStorage.removeItem(`acceptedDocuments_${sessionKey}`);
        console.log("Files deleted successfully.");

      } catch (error) {
        console.error("Error deleting files:", error.message);
      }
    }
  };

  useEffect(() => {
    const storedData = JSON.parse(
      localStorage.getItem(`acceptedDocuments_${sessionKey}`)
    );
    if (storedData) {
      setAcceptedDocuments(storedData);
    }
  }, [sessionKey]);

  useEffect(() => {
    const fetchAcceptedDocuments = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/files/${sessionKey}/accepted`
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch accepted documents. Status: ${response.status}`
          );
        }

        const acceptedDocumentsDataOut = await response.json();
        setAcceptedDocuments(acceptedDocumentsDataOut);
        localStorage.setItem(
          `acceptedDocuments_${sessionKey}`,
          JSON.stringify(acceptedDocumentsDataOut)
        );
      } catch (error) {
        console.error("Error fetching accepted documents:", error.message);
      } finally {
      }
    };

    fetchAcceptedDocuments();
  }, [sessionKey]);

  return (
    <div>
      <div className="navbar-left">
        <NavbarBS />
        <div className="navbar-accept">
          <h2>Accepted Documents:</h2>
          <button onClick={handleReset} className="reset-button">
            Reset
          </button>
            <ul>
              {acceptedDocuments.map((document, index) => (
                <li key={index}>
                  <p>Name: {document.file_name}</p>
                  <p>Status: {document.status}</p>
                </li>
              ))}
            </ul>
        </div>
      </div>

      <div className="clubpage-body"></div>
    </div>
  );
};

export default BusinessSquad;
