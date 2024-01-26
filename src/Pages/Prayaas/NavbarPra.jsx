import React from "react";
import { Link } from "react-router-dom";
import "../NavbarReg.css";
import PraLogo from "../../public/clublogos/Prayaas.jpg";

const NavbarPra = () => {
  return (
    <div className="navbar_container_club">
      <div className="navbar_image_club">
        <img src={PraLogo} alt="ecobiz logo" />
        <div className="vertical_line_club"></div>
        <p>Prayaas</p>
      </div>
      <div className="navbar_content_club">
        <ul className="navbar_list_club">
          <li>
            <Link to="/homepage">Home</Link>
          </li>
          <li>
            <Link to="/kanban/Prayaas">Kanban</Link>
          </li>
          <li>
            <Link to="/documentupload/Prayaas">Dropzone</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavbarPra;
