import React from "react";
import { Link } from "react-router-dom";
import "../NavbarReg.css";
import GraLogo from "../../public/clublogos/Graffiti.jpg";

const NavbarG = () => {
  return (
    <div className="navbar_container_club">
      <div className="navbar_image_club">
        <img src={GraLogo} alt="ecobiz logo" />
        <div className="vertical_line_club"></div>
        <p>Graffiti</p>
      </div>
      <div className="navbar_content_club">
        <ul className="navbar_list_club">
          <li>
            <Link to="/homepage">Home</Link>
          </li>
          <li>
            <Link to="/kanban/Graffiti">Kanban</Link>
          </li>
          <li>
            <Link to="/documentupload/Graffiti">Dropzone</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavbarG;
