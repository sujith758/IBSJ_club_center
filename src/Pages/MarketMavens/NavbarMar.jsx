import React from "react";
import { Link } from "react-router-dom";
import "../NavbarReg.css";
import MarLogo from "../../public/clublogos/Market Mavens.jpg";

const NavbarMar = () => {
  return (
    <div className="navbar_container_club">
      <div className="navbar_image_club">
        <img src={MarLogo} alt="ecobiz logo" />
        <div className="vertical_line_club"></div>
        <p>Market Mavens</p>
      </div>
      <div className="navbar_content_club">
        <ul className="navbar_list_club">
          <li>
            <Link to="/homepage">Home</Link>
          </li>
          <li>
            <Link to="/kanban/MarketMavens">Kanban</Link>
          </li>
          <li>
            <Link to="/documentupload/MarketMavens">Dropzone</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavbarMar;
