import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

import "./Homepage.css";
import ScrollMenu from "./ScrollMenu/ScrollMenu";
import NavbarHP from "./Navbar/NavbarHP";

// import Footer from "./Footer/Footer";
// import RandomizedList from "./RandomList/RandomList";
// import CollegeFrom from "../../public/CollegeFront.jpg";


const Homepage = () => {
  useEffect(() => {
    gsap.registerPlugin(window.DrawSVGPlugin);

    gsap.from(".homepage_title h1", {
      duration: 0.5,
      x: -400,
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
      </div>
      <ScrollMenu />
    </div>
  );
};

export default Homepage;
