import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Lottie from "lottie-react";
import FloatingThings from "../../public/FloatingHomepage.json";
import "./Homepage.css";
import ScrollMenu from "./ScrollMenu/ScrollMenu";
import NavbarHP from "./Navbar/NavbarHP";
import { motion as m } from "framer-motion";

const Homepage = () => {
  const BodyBottomContentRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
    },[]);
    useEffect(() => {
    // Control Lottie animation based on scroll position
    gsap.to(".waving-hand", {
      y: scrollPosition * 0.2, // Adjust the factor as needed
      ease: "none",
    });
  }, [scrollPosition]);

  return (
    <m.main
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.75, ease: "easeInOut" }}
    
  >
    <div className="homepage__div">
      <NavbarHP />
      <div className="floating-lottie">
        <Lottie
          animationData={FloatingThings}
          loop={true}
          className="waving-hand"
        />
      </div>
      <div className="content-homepage">
        <div className="to-center">
          <div className="homepage_title">
            <h1>IBS JAIPUR</h1>
            <h1>CLUB CENTER</h1>
          </div>
        </div>
        {/* <div className="homepage_title">
          <h1>IBS JAIPUR</h1>
          <h1>CLUB CENTER</h1>
        </div> */}
        <div className="bodybottom-content" ref={BodyBottomContentRef}>
          <p>WELCOME TO</p>
          <p>IBS JAIPUR CLUB CENTER</p>
          <p>FUN BEGINS HERE</p>
          <div className="down-arrow">&#9660;</div>
        </div>
      </div>
      <h2>CLUBS</h2>
      <ScrollMenu style={{ position: "relative" }} />
    </div>
    </m.main>
  );
};

export default Homepage;
