import React from "react";
import { Link } from "react-router-dom";
import "../NavbarReg.css";
import PixLogo from "../../public/clublogos/Pixel Club.jpg";

const NavbarPix = () => {
  return (
    <div className="navbar_container_club">
      <div className="navbar_image_club">
        <img src={PixLogo} alt="ecobiz logo" />
        <div className="vertical_line_club"></div>
        <p>Pixel Club</p>
      </div>
      <div className="navbar_content_club">
        <ul className="navbar_list_club">
          <li>
            <Link to="/homepage">Home</Link>
          </li>
          <li>
            <Link to="/kanban/Pixels">Kanban</Link>
          </li>
          <li>
            <Link to="/documentupload/Pixels">Dropzone</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavbarPix;
