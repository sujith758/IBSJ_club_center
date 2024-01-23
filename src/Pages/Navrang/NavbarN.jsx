import React from "react";
import { Link } from "react-router-dom";
import "../NavbarReg.css";
import NLogo from "../../public/clublogos/Navrang.jpg";

const NavbarN = () => {
  return (
    <div className="navbar_container_club">
      <div className="navbar_image_club">
        <img src={NLogo} alt="ecobiz logo" />
        <div className="vertical_line_club"></div>
        <p>Navrang</p>
      </div>
      <div className="navbar_content_club">
        <ul className="navbar_list_club">
          <li>
            <Link to="/homepage">Home</Link>
          </li>
          <li>
            <Link to="/kanban/Navrang">Kanban</Link>
          </li>
          <li>
            <Link to="/documentupload/Navrang">Dropzone</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavbarN;
