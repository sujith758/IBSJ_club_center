import React, { useState } from "react";
import "./LoginModal.css"; // Import your modal styles if you have them

const LoginModal = ({ show, onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Add your login logic here
    console.log("Logging in with:", username, password);
    
    // Close the modal after login attempt (you may want to conditionally close it based on login success)
    onClose();
  };

  return (
    <div className={`modal ${show ? "show" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="modal-content-login" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default LoginModal;
