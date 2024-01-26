import React from "react";
import { Link } from "react-router-dom";
import "../NavbarReg.css";
import IGLogo from "../../public/clublogos/Ignited Minds.jpg";

const NavbarIG = () => {
  return (
    <div className="navbar_container_club">
      <div className="navbar_image_club">
        <img src={IGLogo} alt="ecobiz logo" />
        <div className="vertical_line_club"></div>
        <p>Ignited Minds</p>
      </div>
      <div className="navbar_content_club">
        <ul className="navbar_list_club">
          <li>
            <Link to="/homepage">Home</Link>
          </li>
          <li>
            <Link to="/kanban/IgnitedMinds">Kanban</Link>
          </li>
          <li>
            <Link to="/documentupload/IgnitedMinds">Dropzone</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavbarIG;
