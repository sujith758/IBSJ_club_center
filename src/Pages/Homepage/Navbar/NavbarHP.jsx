import React from "react";
import { Link } from "react-router-dom";

const NavbarHP = () => {
  return (
    <div className="navbar_homepage">
      <div className="navbar_image"></div>
      <div className="navbar_content">
        <ul>
          <li>
            <Link className="navbar_link" to="/aboutus">
              About Us
            </Link>
          </li>
          <li>
            <Link className="navbar_link" to="/gallery">
              Gallery
            </Link>
          </li>
          <li>
            <Link className="navbar_link" to="/deanscorner">
              Dean's Corner
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavbarHP;
