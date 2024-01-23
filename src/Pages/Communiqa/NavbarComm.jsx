import React from "react";
import { Link } from "react-router-dom";
import "../NavbarReg.css";
import CommLogo from "../../public/clublogos/Communiqa.jpg";

const NavbarComm = () => {
  return (
    <div className="navbar_container_club">
      <div className="navbar_image_club">
        <img src={CommLogo} alt="ecobiz logo" />
        <div className="vertical_line_club"></div>
        <p>Communiqa</p>
      </div>
      <div className="navbar_content_club">
        <ul className="navbar_list_club">
          <li>
            <Link to="/homepage">Home</Link>
          </li>
          <li>
            <Link to="/kanban/Communiqa">Kanban</Link>
          </li>
          <li>
            <Link to="/documentupload/Communiqa">Dropzone</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavbarComm;

