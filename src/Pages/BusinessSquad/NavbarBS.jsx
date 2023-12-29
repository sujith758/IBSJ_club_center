import React from "react";
import { Link } from "react-router-dom";

const NavbarBS = () => {
  return (
    <div>
      <div className="navbar__container">
        {/* <img src="../Assets/EcoBiz.png" alt="ecobiz logo" /> */}
        <ul className="navbar__list">
        <li><Link to="/">Home</Link></li>
          <li>Gallery</li>
          <li>
           <Link to="/kanban/BusinessSquad">
              Kanban
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavbarBS;
