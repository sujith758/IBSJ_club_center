import React from "react";
import { Link } from "react-router-dom";
import "../NavbarReg.css";
import CogLogo from "../../public/clublogos/Cognizance.jpg";

const NavbarCog = () => {
  return (
    <div className="navbar_container_club">
      <div className="navbar_image_club">
        <img src={CogLogo} alt="ecobiz logo" />
        <div className="vertical_line_club"></div>
        <p>Cognizance</p>
      </div>
      <div className="navbar_content_club">
        <ul className="navbar_list_club">
          <li>
            <Link to="/homepage">Home</Link>
          </li>
          <li>
            <Link to="/kanban/Cognizance">Kanban</Link>
          </li>
          <li>
            <Link to="/documentupload/Cognizance">Dropzone</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavbarCog;
