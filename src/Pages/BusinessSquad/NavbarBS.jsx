import React from "react";
import { Link } from "react-router-dom";
import "../NavbarReg.css";
import BSLogo from "../../public/clublogos/Business Squad.jpg";

const NavbarBS = () => {
  return (
    <div className="navbar_container_club">
      <div className="navbar_image_club">
        <img src={BSLogo} alt="ecobiz logo" />
        <div className="vertical_line_club"></div>
        <p>Business Squad</p>
      </div>
      <div className="navbar_content_club">
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
      </div>
    </div>
  );
};

export default NavbarBS;
