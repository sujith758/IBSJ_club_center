import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { MdCancel } from 'react-icons/md';
import { IoDocumentText, IoDocument } from 'react-icons/io5';
import './DropZone.css';
import { useSession } from './SessionContext';

const FileIcon = ({ fileType }) => {
  if (!fileType || !fileType.name) {
    return null;
  }

  const { name, type } = fileType;

  if (name && type) {
    switch (true) {
      case name.endsWith('.pdf') || type === 'application/pdf':
        return <IoDocumentText color="#ff0000" size={32} />;
      case name.endsWith('.doc') || name.endsWith('.docx') || type.includes('document'):
        return <IoDocument color="#007acc" size={32} />;
      default:
        return null;
    }
  }

  return null;
};

const Dropzone = ({ className, sessionKey, onFileSubmit, submitted, localFiles, setLocalFiles }) => {
  const { getSessionFiles, addFileToSession, removeFileFromSession } = useSession();
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: useCallback((acceptedFiles) => {
      const validFiles = acceptedFiles.filter((file) => file.size <= 10 * 1024 * 1024);

      if (validFiles.length > 0) {
        setLocalFiles((prevFiles) => [...prevFiles, ...validFiles]);
      } else {
        alert('One or more files exceed the size limit (10MB).');
      }
    }, []),
  });

  useEffect(() => {
    if (submitted) {
      // Clear local files after submission
      setLocalFiles([]);
    }
  }, [submitted, setLocalFiles]);

  const removeFile = (name) => {
    setLocalFiles((prevFiles) => prevFiles.filter((file) => file.name !== name));
    removeFileFromSession(sessionKey, name);
  };

  return (
    <>
      <form>
        <div
          {...getRootProps({
            className: `dropzone ${isDragActive ? 'active' : ''} ${className}`,
          })}
        >
          <input {...getInputProps()} />
          <p>{isDragActive ? 'Drop the files here ...' : '+ Drag \'n\' drop some files here, or click to select files'}</p>
        </div>
        <h3 className='files-heading'>Accepted Files</h3>
        <div className='files-preview'>
          {localFiles.length > 0 && (
            <ul className='file-list-ul'>
              {localFiles.map((file) => (
                <li key={file.name} className='file-list'>
                  <div className='file-preview'>
                    {file && file.name && (file.type === 'application/pdf' || file.name.endsWith('.pdf')) ? (
                      <FileIcon fileType="pdf" />
                    ) : file && file.type && (file.type.includes('document') || file.name && (file.name.endsWith('.doc') || file.name.endsWith('.docx'))) ? (
                      <FileIcon fileType="doc" />
                    ) : (
                      <img
                        src={file && URL.createObjectURL(file)}
                        alt={file && file.name}
                        className='file-image'
                        onLoad={() => file && URL.revokeObjectURL(URL.createObjectURL(file))}
                      />
                    )}
                  </div>
                  <button
                    type='button'
                    className='remove-button'
                    onClick={() => removeFile(file && file.name)}
                  >
                    <MdCancel color="#ff0000" size={20} />
                  </button>
                  <p className='file-name'>{file && file.name}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </form>
    </>
  );
};

export default Dropzone;
