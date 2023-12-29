import React from "react";
import { Link } from "react-router-dom";
import NavbarHP from "./Navbar/NavbarHP";

const Homepage = () => {
  return (
    <div className="homepage__div">
      <NavbarHP />
      <ul className="homepage">
        <li>
          <Link className="link_text" to="/businesssquad">
            <img src="../../Assets/EcoBiz.png" alt="ecobiz logo" />
          
          </Link>
        </li>
        <li>
          <Link className="link_text" to="/cognizance">
            Cognizance
          </Link>
        </li>
        <li>
          <Link className="link_text" to="/communiqa">
            Communiqa
          </Link>
        </li>
        <li>
          <Link className="link_text" to="/graffiti">
            Graffiti
          </Link>
        </li>
        <li>
          <Link className="link_text" to="/ignitedminds">
            IgnitedMinds
          </Link>
        </li>
        <li>
          <Link className="link_text" to="/khelratna">
            KhelRatna
          </Link>
        </li>
        <li>
          <Link className="link_text" to="/marketmavens">
            Market Mavens
          </Link>
        </li>
        <li>
          <Link className="link_text" to="/moneymatrix">
            MoneyMatrix
          </Link>
        </li>
        <li>
          <Link className="link_text" to="/navrang">
            Navrang
          </Link>
        </li>
        <li>
          <Link className="link_text" to="/pixels">
            Pixels
          </Link>
        </li>
        <li>
          <Link className="link_text" to="/prayaas">
            Prayaas
          </Link>
        </li>
        <li>
          <Link className="link_text" to="/synchnorize">
            Synchronize
          </Link>
        </li>
        <li>
          <Link className="link_text" to="/techno">
            Techno
          </Link>
        </li>
        <li>
          <Link className="link_text" to="/youthvibes">
            YouthVibes
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Homepage;
