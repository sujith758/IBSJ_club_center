import React from "react";
import { Link } from "react-router-dom";
import uniLogo from "../../../public/IBS_Jaipur_logo.png"
import "./NavbarHP.css";

const NavbarHP = () => {
  return (
    <div className="navbar_homepage">
      <div className="navbar_image">
        <img src={uniLogo} alt="logo of the University" />
        <div className="vertical_line"></div>
        <p>IBS JAIPUR CLUB CENTER</p>
      </div>
      
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
          <li>
            <Link className="navbar_link" to="/eventcalendar">
              Event Calendar
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavbarHP;
