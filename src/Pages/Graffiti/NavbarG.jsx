import React from "react";
import { Link } from "react-router-dom";

const NavbarG = () => {
  return (
    <div>
      <div className="navbar__container">
        {/* <img src="../Assets/EcoBiz.png" alt="ecobiz logo" /> */}
        <ul className="navbar__list">
        <li><Link to="/">Home</Link></li>
          <li>Gallery</li>
          <li>
           <Link to="/kanban/Graffiti">
              Kanban
            </Link>
          </li>
          <li>
          <Link to='/documentupload/Graffiti'>Dropzone</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavbarG;
