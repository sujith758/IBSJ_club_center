import React from "react";
import { Link } from "react-router-dom";
import "../NavbarReg.css";
import KRLogo from "../../public/clublogos/Khel Ratna.jpg";

const NavbarKR = () => {
  return (
    <div className="navbar_container_club">
      <div className="navbar_image_club">
        <img src={KRLogo} alt="ecobiz logo" />
        <div className="vertical_line_club"></div>
        <p>Khel Ratna</p>
      </div>
      <div className="navbar_content_club">
        <ul className="navbar_list_club">
          <li>
            <Link to="/homepage">Home</Link>
          </li>
          <li>
            <Link to="/kanban/KhelRatna">Kanban</Link>
          </li>
          <li>
            <Link to="/documentupload/KhelRatna">Dropzone</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavbarKR;
