import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import uniLogo from "../../../public/IBS_Jaipur_logo.png";
import "./NavbarHP.css";

const NavbarHP = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };

  const handleLogin = () => {
    // Check if the username and password match (replace with your authentication logic)
    if (username === "admin" && password === "admin#2003") {
      setLoggedIn(true);
      setShowLoginModal(false);
      // Redirect to the desired path after successful login
      window.location.hash = "#/deanscorner";
    } else {
      // You can handle incorrect credentials here (e.g., show an error message)
      console.log("Incorrect username or password");
    }
  };

  // Clean up the entered credentials when the modal is closed
  useEffect(() => {
    if (!showLoginModal) {
      setUsername("");
      setPassword("");
    }
  }, [showLoginModal]);

  return (
    <div className="navbar_homepage">
      <div className="navbar_image">
        <img src={uniLogo} alt="logo of the University" />
        <div className="vertical_line"></div>
        <p>IBS JAIPUR CLUB CENTER</p>
      </div>

      <div className="navbar_content">
        <ul>
          <li>
            <Link className="navbar_link" to="/aboutus">
              About Us
            </Link>
          </li>
          <li>
            <Link className="navbar_link" to="/gallery">
              Gallery
            </Link>
          </li>
          <li>
            {/* Use span for Dean's Corner with an onClick handler */}
            <span className="navbar_link" onClick={toggleLoginModal}>
              Dean's Corner
            </span>
          </li>
          <li>
            <Link className="navbar_link" to="/eventcalendar">
              Event Calendar
            </Link>
          </li>
        </ul>
      </div>

      {showLoginModal && (
        <div className={`login_modal ${showLoginModal ? 'show' : ''}`}>
          <div className={`login_modal-content ${showLoginModal ? 'show' : ''}`}>
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
           <div className="login_modal_buttons">
          <button onClick={handleLogin}>Login</button>
          <button onClick={toggleLoginModal}>Cancel</button>
          </div>
          </div>
         
        </div>
        
      )}
    </div>
  );
};

export default NavbarHP;
