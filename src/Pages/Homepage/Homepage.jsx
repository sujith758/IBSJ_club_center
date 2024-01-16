import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import NavbarHP from "./Navbar/NavbarHP";
import "./Homepage.css"
import gsap from "gsap";

const Homepage = () => {
  useEffect(() => {
    gsap.registerPlugin(window.DrawSVGPlugin);

    gsap.from(".homepage_title h1:nth-child(1)", {
      duration: 1,
      x: -500,
      opacity: 0,
      ease: "power3.inOut",
    });

    gsap.from(".homepage_title h1:nth-child(2)", {
      duration: 1,
      x: +500,
      opacity: 0,
      ease: "power3.inOut",
    });

    gsap.to(".homepage_title h1", {
      duration: 1,
      x: 0,
      delay: 0,
      opacity: 1,
    });
  }, []);



  return (
    <div className="homepage__div">
      <NavbarHP />
      
      <div className="homepage_title">
        <h1>IBS JAIPUR</h1>
        <h1>CLUB CENTER</h1>
      </div>
      <ul className="homepage">
        <li>
          <Link className="link_text" to="/businesssquad">
            Business Squad
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
          <Link className="link_text" to="/ecobiz">
            EcoBiz
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
          <Link className="link_text" to="/synchronize">
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
