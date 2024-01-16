import React from "react";
import { Link } from "react-router-dom";

const NavbarYV = ({onReset}) => {
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
           <Link to="/kanban/YouthVibes">
              Kanban
            </Link>
          </li>
          <li>
          <Link to='/documentupload/YouthVibes'>Dropzone</Link>
          </li>
        </ul>
        <button onClick={handleResetClick} className="reset-button">
              Reset
            </button>
      </div>
    </div>
  );
};

export default NavbarYV;
