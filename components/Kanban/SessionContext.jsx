// SessionContext.js
import React, { createContext, useContext, useState } from 'react';

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [session1, setSession1] = useState({});
  const [session2, setSession2] = useState({});
  const [session3, setSession3] = useState({});
  const [session4, setSession4] = useState({});
  const [session5, setSession5] = useState({});
  const [session6, setSession6] = useState({});
  const [session7, setSession7] = useState({});
  const [session8, setSession8] = useState({});
  const [session9, setSession9] = useState({});
  const [session10, setSession10] = useState({});
  const [session11, setSession11] = useState({});
  const [session12, setSession12] = useState({});
  const [session13, setSession13] = useState({});
  const [session14, setSession14] = useState({});
  const [session15, setSession15] = useState({});
  
  

  return (
    <SessionContext.Provider value={{ session1, setSession1, session2, setSession2, session3, setSession3, session4, setSession4, session5, setSession5, session6, setSession6,session7, setSession7, session8, setSession8, session9, setSession9, session10, setSession10,session11, setSession11, session12, setSession12, session13, setSession13, session14, setSession14, session15, setSession15 }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
