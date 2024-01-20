import React, { useEffect, useRef } from "react";
import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./Homepage.css";
import ScrollMenu from "./ScrollMenu/ScrollMenu";
import NavbarHP from "./Navbar/NavbarHP";


// gsap.registerPlugin(ScrollTrigger);

const Homepage = () => {
  const BodyBottomContentRef = useRef(null);

  useEffect(() => {
    gsap.from(BodyBottomContentRef.current.children, {
      x: -500,
      opacity: 0,
      duration: 1,
    });
    gsap.to(BodyBottomContentRef.current.children, {
      x: 0,
      opacity: 1,
      duration: 1.5,
    });

    // Add stagger to create a downward arrow animation
    gsap.fromTo(
      ".down-arrow",
      { y: -20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        repeat: -1,
        repeatDelay: 0.5,
        ease: "power1.inOut",
      }
    );
  }, []);

  return (
    <div className="homepage__div">
      <NavbarHP />

      <div className="content-homepage">
        <div className="homepage_title">
          <h1>IBS JAIPUR</h1>
          <h1>CLUB CENTER</h1>
        </div>
        <div className="bodybottom-content" ref={BodyBottomContentRef}>
          <p>WELCOME TO</p>
          <p>IBS JAIPUR CLUB CENTER</p>
          <p>FUN BEGINS HERE</p>

          {/* Downward arrow */}
          <div className="down-arrow">&#9660;</div>
        </div>
      </div>

      <ScrollMenu style={{ position: "relative" }} />
    </div>
  );
};

export default Homepage;
