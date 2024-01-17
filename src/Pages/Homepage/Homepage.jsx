import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import NavbarHP from "./Navbar/NavbarHP";
import "./Homepage.css";
import ScrollMenu from "./ScrollMenu/ScrollMenu";
import gsap from "gsap";
import Footer from "./Footer/Footer";
// import BSLogo from "../../Assets/clublogos/Business Squad.jpg";
// import CogLogo from "../../Assets/clublogos/Cognizance.jpg";
// import CommLogo from "../../Assets/clublogos/Communiqua.jpg";
// import EcoLogo from "../../Assets/clublogos/EcoBiz.png";
// import GraffitiLogo from "../../Assets/clublogos/Graffiti.jpg";
// import IGLogo from "../../Assets/clublogos/IGNITED MINDS - LOGO.png";
// import KRLogo from "../../Assets/clublogos/Khel Ratna.jpg";
// import MarLogo from "../../Assets/clublogos/Market Mavens.jpg";
// import MonLogo from "../../Assets/clublogos/Money Matrix Club.jpg";
// import NavLogo from "../../Assets/clublogos/Navrang.jpg";
// import PixLogo from "../../Assets/clublogos/Pixel Club.jpg";
// import PraLogo from "../../Assets/clublogos/Prayaas.jpg";
// import SyncLogo from "../../Assets/clublogos/syncHRonize.jpg";
// import TechLogo from "../../Assets/clublogos/Techno Club.jpg";
// import YVLogo from "../../Assets/clublogos/Youth Vibes.jpg";

const Homepage = () => {
  useEffect(() => {
    gsap.registerPlugin(window.DrawSVGPlugin);

    gsap.from(".homepage_title h1", {
      duration: 0.5,
      y: -400,
      opacity: 0,
      ease: "power3.inOut",
    });

    
   

    gsap.from(".homepage_title h2", {
      duration: 0.5,
      x: 500,
      opacity: 0,
      ease: "power3.inOut",
    });

    gsap.to(".homepage_title h1", {
      duration: 0.5,
      x: 0,
      y: 0,
      delay: 0,
      opacity: 1,
    });

   

    gsap.to(".homepage_title h2", {
      duration: 0.5,
      x: 0,
      y: 0,
      delay: 0,
      opacity: 1,
    });
  }, []);

  return (
    <div className="homepage__div">
      <NavbarHP />
      <div className="homepage_title">
        <h1>IBS JAIPUR CLUB CENTER</h1>
        <h2>IBS JAIPUR CLUB CENTER</h2>
      </div>
      <ScrollMenu />
      <Footer />
    </div>
  );
};

export default Homepage;
