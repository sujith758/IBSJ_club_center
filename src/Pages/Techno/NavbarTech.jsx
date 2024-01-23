import React from "react";
import { Link } from "react-router-dom";
import "../NavbarReg.css";
import TechLogo from "../../public/clublogos/Techno Club.jpg";

const NavbarTech = () => {
  return (
    <div className="navbar_container_club">
      <div className="navbar_image_club">
        <img src={TechLogo} alt="ecobiz logo" />
        <div className="vertical_line_club"></div>
        <p>Techno Club</p>
      </div>
      <div className="navbar_content_club">
        <ul className="navbar_list_club">
          <li>
            <Link to="/homepage">Home</Link>
          </li>
          <li>
            <Link to="/kanban/Techno">Kanban</Link>
          </li>
          <li>
            <Link to="/documentupload/Techno">Dropzone</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavbarTech;
