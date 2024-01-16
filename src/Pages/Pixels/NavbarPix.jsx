import React from "react";
import { Link } from "react-router-dom";

const NavbarPix = ({onReset}) => {
  const handleResetClick = () => {
    const isConfirmed = window.confirm('Are you sure you want to reset the data?');
    if (isConfirmed) {
      onReset(); // Call the provided callback function for reset
    }
  };
  return (
    <div>
      <div className="navbar__container">
        {/* <img src="../Assets/EcoBiz.png" alt="ecobiz logo" /> */}
        <ul className="navbar__list">
        <li><Link to="/">Home</Link></li>
          <li>Gallery</li>
          <li>
           <Link to="/kanban/Pixels">
              Kanban
            </Link>
          </li>
          <li>
          <Link to='/documentupload/Pixels'>Dropzone</Link>
          </li>
        </ul>
        <button onClick={handleResetClick} className="reset-button">
              Reset
            </button>
      </div>
    </div>
  );
};

export default NavbarPix;
