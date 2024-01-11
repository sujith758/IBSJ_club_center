import React, { createContext, useContext, useState, useEffect } from 'react';

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [sessions, setSessions] = useState({});

  const getSessionFiles = (sessionKey) => {
    return sessions[sessionKey] ? sessions[sessionKey].files : [];
  };

  const addFileToSession = (sessionKey, file) => {
    setSessions((prevSessions) => ({
      ...prevSessions,
      [sessionKey]: {
        files: [...(prevSessions[sessionKey]?.files || []), file],
      },
    }));
  };

  const removeFileFromSession = (sessionKey, fileName) => {
    setSessions((prevSessions) => ({
      ...prevSessions,
      [sessionKey]: {
        files: prevSessions[sessionKey]?.files.filter((file) => file.name !== fileName) || [],
      },
    }));
  };

  useEffect(() => {
    // Additional side effects or state updates after the initial render can be added here.
  }, [sessions]); // Empty dependency array to run the effect only once after the initial render

  return (
    <SessionContext.Provider value={{ getSessionFiles, addFileToSession, removeFileFromSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  return useContext(SessionContext);
};
