import React from "react";
import { Link } from "react-router-dom";

const NavbarBS = ({ onReset }) => {
  const handleResetClick = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to reset the data?"
    );
    if (isConfirmed) {
      onReset();
    }
  };
  return (
    <div>
      <div className="navbar_container_club">
        {/* <img src="../Assets/EcoBiz.png" alt="ecobiz logo" /> */}
        <ul className="navbar_list_club">
          <li>
            <Link to="/homepage">Home</Link>
          </li>
          <li>
            <Link to="/kanban/BusinessSquad">Kanban</Link>
          </li>
          <li>
            <Link to="/documentupload/BusinessSquad">Dropzone</Link>
          </li>
        </ul>
        <button onClick={handleResetClick} className="reset-button">
          Reset
        </button>
      </div>
    </div>
  );
};

export default NavbarBS;
