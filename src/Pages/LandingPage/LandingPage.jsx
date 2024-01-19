import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom"; 
import Lottie from "lottie-react";
import CountUp from "react-countup";
import LoadingSphere from "../../public/Loading Sphere.json";
import WavingHand from "../../public/WavingHand.json";
import "./LandingPage.css";
import MagicDots from "./MagicDots";

const LandingPage = () => {
  const [showHeader, setShowHeader] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const mouseCircleRef = useRef(null);

  useEffect(() => {
    if (showHeader) {
      gsap.from(".header-container", {
        opacity: 0,
        y: -10,
        duration: 0.8,
        ease: "power3.out",
      });
    }

    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });

      // Add trail effect to the mouse circle
      gsap.to(mouseCircleRef.current, {
        left: event.clientX,
        top: event.clientY - 2,
        duration: 0.3,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [showHeader]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setDisplayText("ENTER"); // Set the text you want to display
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setDisplayText("");
  };

  useEffect(() => {
    if (isHovered) {
      gsap.to(".mouse-circle", {
        width: 180,
        height: 180,
        duration: 0.2,
      });
    } else {
      gsap.to(".mouse-circle", {
        width: 15,
        height: 15,
        duration: 0.2,
      });
    }
  }, [isHovered]);

  return (
    <div className="landing-page">
      
      <div className="landing-page-logo">
        <img src="src/public/IBS_Jaipur_logo.png" alt="college logo" />
        
      </div>
      <MagicDots className="magic-dots" />
      {!showHeader ? (
        <div className="count-up">
          <div className="count-up-text">
            <CountUp start={0} end={100} delay={0.7} useEasing={false} duration={5} onEnd={() => setShowHeader(true)}>
              {({ countUpRef }) => (
                <div>
                  <span ref={countUpRef} />
                </div>
              )}
            </CountUp>
          </div>
          <div className="loading-sphere">
            <Lottie animationData={LoadingSphere} loop={true} />
          </div>
        </div>
      ) : (
        
        <div className="header-container">
        <Link to="/homepage" style={{ textDecoration: 'none', color: 'white' }}>
          <h1 onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>IBS JAIPUR</h1>
        </Link>
        <Link to="/homepage" style={{ textDecoration: 'none', color: 'white' }}>
          <h1 onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>CLUB CENTER</h1>
        </Link>
      </div>
    
      )}
      <div className="bottom-container">
        <div className="left-content">
          <p>WELCOME TO</p>
          <p>IBS JAIPUR CLUB CENTER</p>
          <p>FUN BEGINS HERE</p>
        </div>
        <div className="lottie-container">
          <Lottie animationData={WavingHand} loop={true} className="waving-hand" />
        </div>
      </div>
      {/* Render a small circle at the mouse position */}
      <div className="mouse-circle" ref={mouseCircleRef}>
        {isHovered && (
          <p style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "70px",
            fontSize: "25px",
          }}>{displayText}</p>
        )}
      </div>
    </div>
  );
};

export default LandingPage;