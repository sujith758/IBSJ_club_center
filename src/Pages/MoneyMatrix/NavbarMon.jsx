import React from "react";
import { Link } from "react-router-dom";
import "../NavbarReg.css";
import MonLogo from "../../public/clublogos/Money Matrix Club.jpg";

const NavbarMon = () => {
  return (
    <div className="navbar_container_club">
      <div className="navbar_image_club">
        <img src={MonLogo} alt="ecobiz logo" />
        <div className="vertical_line_club"></div>
        <p>Money Matrix Club</p>
      </div>
      <div className="navbar_content_club">
        <ul className="navbar_list_club">
          <li>
            <Link to="/homepage">Home</Link>
          </li>
          <li>
            <Link to="/kanban/MoneyMatrix">Kanban</Link>
          </li>
          <li>
            <Link to="/documentupload/MoneyMatrix">Dropzone</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavbarMon;
