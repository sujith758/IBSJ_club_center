import React, { useState } from 'react';
import Dropzone from '../../../components/DropZone/Dropzone';
import '../../../components/DropZone/DocumentUpload.css';
import { SessionProvider } from '../../../components/DropZone/SessionContext';

const DocumentUploadEB = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submittedFiles, setSubmittedFiles] = useState([]);
  const [localFiles, setLocalFiles] = useState([]);

  const handleFileSubmit = async () => {
    // Assuming you have an API endpoint to handle file upload
    const sessionKey = "EcoBiz"; // Change this to the desired sessionKey
    const formData = new FormData();
    formData.append("sessionkey", sessionKey);
    localFiles.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await fetch("http://localhost:3001/upload", {
        method: 'POST',
        body: formData,
        headers: {
          'sessionKey': 'EcoBiz',
        },
      });

      if (response.ok) {
        setSubmitted(true);
        setSubmittedFiles(localFiles);
        setLocalFiles([]); // Clear localFiles after submission
      } else {
        // Handle error
        console.error('Failed to upload files');
      }
    } catch (error) {
      console.error('Error during file upload', error);
    }
  };

  return (
    <SessionProvider>
      <div className="document__upload">
        <h1>Upload Files</h1>
        {!submitted && (
          <>
            <Dropzone
              className="drop-zone"
              sessionKey="EcoBiz"
              onFileSubmit={handleFileSubmit}
              submitted={submitted}
              localFiles={localFiles}
              setLocalFiles={setLocalFiles}
            />
            <button
              type="button"
              className="submit-button"
              onClick={handleFileSubmit}
            >
              Submit
            </button>
          </>
        )}
        {submitted && (
          <div>
            <p>Files submitted successfully!</p>
            <p>Submitted Files:</p>
            <ul>
              {submittedFiles.map((file) => (
                <li key={file.name}>{file.name}</li>
              ))}
            </ul>
            {/* Display any other content or components after submission */}
          </div>
        )}
      </div>
    </SessionProvider>
  );
};

export default DocumentUploadEB;
