import React from "react";
import { Link } from "react-router-dom";
import "../NavbarReg.css";
import YVLogo from "../../public/clublogos/Youth Vibes.jpg";

const NavbarYV = () => {
  return (
    <div className="navbar_container_club">
      <div className="navbar_image_club">
        <img src={YVLogo} alt="ecobiz logo" />
        <div className="vertical_line_club"></div>
        <p>Youth Vibes</p>
      </div>
      <div className="navbar_content_club">
        <ul className="navbar_list_club">
          <li>
            <Link to="/homepage">Home</Link>
          </li>
          <li>
            <Link to="/kanban/YouthVibes">Kanban</Link>
          </li>
          <li>
            <Link to="/documentupload/YouthVibes">Dropzone</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavbarYV;
