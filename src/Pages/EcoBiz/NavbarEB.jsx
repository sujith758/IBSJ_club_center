import React from "react";
import { Link } from "react-router-dom";
import "../NavbarReg.css";
import EBLogo from "../../public/clublogos/EcoBiz.jpg";

const NavbarEB = () => {
  return (
    <div className="navbar_container_club">
      <div className="navbar_image_club">
        <img src={EBLogo} alt="ecobiz logo" />
        <div className="vertical_line_club"></div>
        <p>EcoBiz</p>
      </div>
      <div className="navbar_content_club">
        <ul className="navbar_list_club">
          <li>
            <Link to="/homepage">Home</Link>
          </li>
          <li>
            <Link to="/kanban/EcoBiz">Kanban</Link>
          </li>
          <li>
            <Link to="/documentupload/EcoBiz">Dropzone</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavbarEB;
