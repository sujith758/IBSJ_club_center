import React from "react";
import { Link } from "react-router-dom";
import "../NavbarReg.css";
import SyncLogo from "../../public/clublogos/Synchronize.jpg";

const NavbarSync = () => {
  return (
    <div className="navbar_container_club">
      <div className="navbar_image_club">
        <img src={SyncLogo} alt="ecobiz logo" />
        <div className="vertical_line_club"></div>
        <p>Synchronize</p>
      </div>
      <div className="navbar_content_club">
        <ul className="navbar_list_club">
          <li>
            <Link to="/homepage">Home</Link>
          </li>
          <li>
            <Link to="/kanban/Synchronize">Kanban</Link>
          </li>
          <li>
            <Link to="/documentupload/Synchronize">Dropzone</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavbarSync;
